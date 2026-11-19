SIEMRIDE - WEBSITE MESSAGE EMAIL SETUP (5 minutes, free)
=========================================================
Why: the old free service (FormSubmit) needs an activation click and often blocks pages opened from a folder.
This setup uses YOUR OWN Google account, so every message is (1) emailed to siemride@gmail.com and
(2) saved as a row in a Google Sheet = your permanent record.

STEPS (sign in as siemride@gmail.com)
1. Go to sheets.google.com -> create a blank sheet, name it "SiemRide Messages".
2. Menu: Extensions -> Apps Script. Delete everything in the editor and paste ALL of Code.gs. Save (disk icon).
3. In the toolbar choose the function "testEmail" and press Run. Click "Review permissions" -> choose the account ->
   Advanced -> "Go to project (unsafe)" -> Allow. A test email arrives in siemride@gmail.com. (If it does, Gmail works.)
4. Press Deploy -> New deployment -> gear icon -> "Web app".
      Execute as: Me          Who has access: Anyone
   Press Deploy -> copy the "Web app URL" (https://script.google.com/macros/s/.../exec).
5. Open JavaScript/script.js, find   var APPS_SCRIPT_URL = '';   and paste the URL between the quotes.
   Upload the site again. Done - send a test message from the website.

IF YOU EDIT Code.gs LATER: Deploy -> Manage deployments -> pencil -> Version: New version -> Deploy.

QUICKER ALTERNATIVE (email only, no sheet): get a free key at web3forms.com (enter siemride@gmail.com) and paste it into
   var WEB3FORMS_KEY = '';
