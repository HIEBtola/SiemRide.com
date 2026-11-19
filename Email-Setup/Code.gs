/**
 * SiemRide - website messages -> Gmail + Google Sheet
 * Paste this whole file into Extensions > Apps Script of a Google Sheet, then Deploy > New deployment > Web app.
 */
var TEAM_EMAIL = 'siemride@gmail.com';

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    var when = Utilities.formatDate(new Date(), 'Asia/Phnom_Penh', 'yyyy-MM-dd HH:mm:ss');

    // 1) record in the sheet
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sh.getLastRow() === 0) sh.appendRow(['Time (Cambodia)', 'Name', 'Phone', 'Email', 'Message', 'Page']);
    sh.appendRow([when, d.name || '', d.phone || '', d.email || '', d.message || '', d.page || '']);

    // 2) email the team (reply goes straight to the customer when they gave an email)
    var body = 'New website message\n\n' +
      'Name: ' + (d.name || '') + '\nPhone/WhatsApp: ' + (d.phone || '') + '\nEmail: ' + (d.email || '') +
      '\nTime: ' + when + '\nPage: ' + (d.page || '') + '\n\nMessage:\n' + (d.message || '');
    var opts = { name: 'SiemRide Website' };
    if (d.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) opts.replyTo = d.email;
    MailApp.sendEmail(TEAM_EMAIL, 'SiemRide message from ' + (d.name || 'visitor'), body, opts);

    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err);
  }
}

// Run this once from the editor (Run > testEmail) to authorise Gmail and prove it works.
function testEmail() {
  MailApp.sendEmail(TEAM_EMAIL, 'SiemRide test', 'If you can read this, the website email works.');
}
