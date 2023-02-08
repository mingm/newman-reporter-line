
class LineReporter {
    constructor(emitter, reporterOptions) {
        const token = process.env.LINE_TOKEN || reporterOptions.token;

        if (!token) {
            console.log('please provide Line token');
            return;
        }

        emitter.on('done', (err, summary) => {
            if (err) {
                return;
            }
            let run = summary.run;
            let totalFailures = summary.run.failures;

            let text = 'Alert:';

            for (let failure of totalFailures) {
                text += '\n\nCase: ' + failure.error.test;
            }

            const lineNotify = require('line-notify-nodejs')(token);

            lineNotify.notify({
              message: text,
            }).then(() => {
              console.log('send completed!');
            });

        });
    }
}

module.exports = LineReporter;
