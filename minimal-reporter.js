const fs = require('fs');
const path = require('path');

class MinimalReporter {
  constructor() {
    this.reportDir = 'reports';
    this.results = []; // Initialize results array

    // Ensure report directory exists
    try {
      if (!fs.existsSync(this.reportDir)) {
        fs.mkdirSync(this.reportDir);
      }
    } catch (error) {
      console.error('Error creating report directory:', error);
    }
  }

  onBegin(config, suite) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.reportFile = path.join(this.reportDir, `report_${timestamp}.html`);

    // Initialize report file
    fs.writeFileSync(this.reportFile, `
      <html>
        <head><title>Playwright Test Report</title></head>
        <body>
          <h1>Test Report - ${timestamp}</h1>
          <ul id="test-results">
    `);
  }

  onTestBegin(test) {
    console.log(`Test started: ${test.title}`);
  }

  onTestEnd(test) {
    // Determine test status
    let result = 'Unknown';
    if (test.status === 'passed') {
      result = 'Passed';
    } else if (test.status === 'failed') {
      result = 'Failed';
    }

    console.log(`Test ended: ${test.title}, status: ${result}`);
    this.results.push({ title: test.title, status: result }); // Push result to array
  }

  onEnd() {
    console.log('Generating custom report...');
    const reportContent = this.generateReport(); // Generate full report
    fs.writeFileSync(this.reportFile, reportContent); // Write to the initialized report file
  }

  generateReport() {
    return `
      <html>
        <head><title>Test Report</title></head>
        <body>
          <h1>Test Results</h1>
          <ul>
            ${this.results.map(r => `<li>${r.title}: ${r.status}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;
  }
}

module.exports = MinimalReporter;
