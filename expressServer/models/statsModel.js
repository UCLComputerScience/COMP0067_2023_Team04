const db = require('../config/db');

class StatsModel {
  static async getCurrentStats() {
    const sqlCurrentStats = `
    SELECT state, COUNT(*) as count
    FROM device
    GROUP BY state
    `;

    const sqlOverdue = `
    SELECT COUNT(*) as overdue
    FROM loan
    WHERE state = 'Loaned' AND dueDate < CURDATE() AND returnedDate IS NULL
    `;

    const [stateResults] = await db.execute(sqlCurrentStats);
    const [overdueResults] = await db.execute(sqlOverdue);

    const stats = {
      total: stateResults.reduce((sum, row) => sum + row.count, 0),
      overdue: overdueResults[0].overdue,
    };

    for (let row of stateResults) {
      stats[row.state] = row.count;
    }

    return stats;
  }

  static async getYearlyStats() {
    const sqlYearlyStats = `
    SELECT SUM(cost) as expenditure, COUNT(*) as totalLoans
    FROM device
    JOIN loan ON device.deviceId = loan.deviceId
    WHERE YEAR(loan.startDate) = YEAR(CURDATE())
    `;

    const sqlOnTime = `
    SELECT COUNT(*) as onTime
    FROM loan
    WHERE YEAR(startDate) = YEAR(CURDATE()) AND returnedDate <= dueDate
    `;

    const sqlLate = `
    SELECT COUNT(*) as late
    FROM loan
    WHERE YEAR(startDate) = YEAR(CURDATE()) AND returnedDate > dueDate
    `;

    const sqlMostPopular = `
    SELECT name, COUNT(*) as count
    FROM device
    JOIN loan ON device.deviceId = loan.deviceId
    WHERE YEAR(loan.startDate) = YEAR(CURDATE())
    GROUP BY name
    ORDER BY count DESC
    LIMIT 1
    `;

    const [yearlyStatsResults] = await db.execute(sqlYearlyStats);
    const [onTimeResults] = await db.execute(sqlOnTime);
    const [lateResults] = await db.execute(sqlLate);
    const [mostPopularResults] = await db.execute(sqlMostPopular);

    const stats = {
      expenditure: yearlyStatsResults[0].expenditure,
      totalLoans: yearlyStatsResults[0].totalLoans,
      onTime: onTimeResults[0].onTime,
      late: lateResults[0].late,
      mostPopular: mostPopularResults[0] ? mostPopularResults[0].name : null,
    };

    return stats;
  }
}

module.exports = StatsModel;
