# Firemail
Use Firebase Cloud Functions to host a web service that sends email.

# Required configuration
You can either fork this repository and configure it, or use the package in your own project. In both cases, you'll need to do the following:

1. If you haven't, create a firebase project: https://console.firebase.google.com
2. In your root folder, create a `.firebaserc` file with the following structure:
    ```json
    {
      "projects": {
        "default": "<YOUR-PROJECT-NAME>"
      }
    }
    ```
    Make sure you set your project's name in the configuration.
3. Install the `firebase` command using `npm install firebase-tools --global`
4. Run the following command with your own credentials:
    ```
    firebase functions:config:set email.sender="sender@example.com" email.password="password"
    ```
    For more options, see [Additional configuration](#additional-configuration).
5. If you're using Gmail to deliver messages, you may need to setup your account to allow using it as an SMTP server:
      - https://www.google.com/settings/security/lesssecureapps
      - https://accounts.google.com/DisplayUnlockCaptcha

If you forked this repository, run `npm install`, then `firebase deploy --only functions` to deploy your web service, and you should be done!

Otherwise, if you have an existing project that you want to integrate Firemail with, there are some additional steps:
1. Run `npm install firemail`
2. Create a `firebase.json` file with the following structure:
    ```json
    {
      "functions": {
          "source": "node_modules/firemail/functions"
        }
    }
    ```
3. Finally, deploy your web service by running `firebase deploy --only functions`

# Additional configuration
You can set these options using `firebase functions:config:set ...` again

## origin
By default, the service can accept [cross-domain requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access-Control-Allow-Origin). To secure your service, it's recommended that you use an origin different than `*` in production applications.
```
email.origin="*"
```

## recipient
By default, the service sends emails to the sender's own account. This is particularly useful for adding a simple contact form to your website. If you want to send emails to a different email address, use this option:
```
email.recipient="recipient@example.com"
```

For security reasons, this is a configuration option only. The service doesn't allow the recipient to be sent in the HTTP request body - otherwise, a malicious user could use it to send emails from the unsuspecting sender's account to random addresses.

## alias
By default, the service uses the sender's email address as the `from` field. If you want to customize it, use this option:
```
email.alias="MyWebsite <noreply@mywebsite.com>"
```

If using Gmail, you have to setup the account as an alias: https://support.google.com/mail/answer/22370

## smtpServerUrlTemplate
If you want to use an email provider other than Gmail, you can change the SMTP Server URL Template, which is `smtps://${email}:${password}@smtp.gmail.com` by default:
```
email.smtpServerUrlTemplate="smtps://${email}:${password}@smtp.<SOME-OTHER-SMTP-PROVIDER>.com"
```

# Running locally
After setting up the remote configuration, you can pull it locally using:
```
firebase functions:config:get > ./functions/.runtimeconfig.json
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
