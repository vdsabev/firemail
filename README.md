# Firemail
Use Firebase Cloud Functions to host a web service that sends email.

# Setup
1. If you haven't, create a firebase project: https://console.firebase.google.com
2. Install dependencies using `npm install`
3. Create a `.firebaserc` file with the following structure:
    ```json
    {
      "projects": {
        "default": "<YOUR-PROJECT-NAME>"
      }
    }
    ```
4. Run the following command using your credentials:
    ```
    firebase functions:config:set email.recipient="recipient@example.com" email.sender="sender@example.com" email.password="password"
    ```
5. If you use a Gmail account, you may need to additionally setup your account:
      - https://www.google.com/settings/security/lesssecureapps
      - https://accounts.google.com/DisplayUnlockCaptcha
6. If you want to use something other than Gmail, you can change the SMTP Server URL Template, which is `smtps://${email}:${password}@smtp.gmail.com` by default:
    ```
    firebase functions:config:set email.smtpServerUrlTemplate="smtps://${email}:${password}@smtp.<SOME-OTHER-SMTP-PROVIDER>.com"
    ```
7. After you've configured everything, deploy your web service using `npm run deploy`

# Running locally
After setting up the remote configuration, you can pull it locally using:
```
firebase functions:config:get > .runtimeconfig.json
```
Then run `npm start` to start a local firebase functions server.

# License
Copyright (c) 2017 Vladimir Sabev

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
