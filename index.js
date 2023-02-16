
class LineReporter {
    constructor(emitter, reporterOptions) {
        const token = process.env.LINE_TOKEN || reporterOptions.token;
        const result = process.env.LINE_SHOW_RESULT || reporterOptions.showresult;

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

            let text = '\n\nRun: ' + summary.collection.name;
			text += '\nEnv: ' + summary.environment.name;

            if (result) {
                text += '\n\nResult: ';
                text += '\nTotal of script: ' + run.stats['testScripts'].total;
                text += '\nTotal of failed script: ' + run.stats['testScripts'].failed;
                text += '\n\nTotal of assertions: ' + run.stats['assertions'].total;
                text += '\nTotal of failed assertions: ' + run.stats['assertions'].failed;
            }

			let message;
			if (totalFailures.length > 0) {

                text += '\n\nAlert:';

                for (let failure of totalFailures) {
                    text += '\nCase: ' + failure.error.test;
                }

				message = {
				  message: text,
				  stickerPackageId: 11538,
				  stickerId: 51626518
				}

			} else {
				message = {
				  message: text,
				  stickerPackageId: 11537,
				  stickerId: 52002740
				}
			}

            const lineNotify = require('line-notify-nodejs')(token);

            lineNotify.notify(message).then(() => {
              console.log('send completed!');
            });

        });
    }
}

module.exports = LineReporter;
