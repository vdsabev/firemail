# Firemail
Use Firebase Cloud Functions to host a web service that sends email.

# Setup
1. Install dependencies using `npm install`
2. Create a `.firebaserc` file with the following structure:
    ```json
    {
      "projects": {
        "default": "<YOUR-PROJECT-NAME>"
      }
    }
    ```
3. Run the following command using your credentials:
    ```
    firebase functions:config:set email.recipient="recipient@example.com" email.sender="sender@example.com" email.password="password"
    ```
4. If you use a Gmail account, you may need to additionally setup your account:
  - https://www.google.com/settings/security/lesssecureapps
  - https://accounts.google.com/DisplayUnlockCaptcha

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
