
class LineReporter {
    constructor(emitter, reporterOptions) {
        const token = process.env.LINE_TOKEN || reporterOptions.token;
        const summaryFlag = process.env.LINE_SUMMARY || reporterOptions.summary;
        const resultFlag = process.env.LINE_RESULT || reporterOptions.result;

        if (!token) {
            console.log('please provide Line token');
            return;
        }

        emitter.on('done', (err, summary) => {
            if (err) {
                return;
            }
            let run = summary.run;
			let executions = summary.run.executions;
            let totalFailures = summary.run.failures;

            let text = '\n\nRun: ' + summary.collection.name;
			text += '\nEnv: ' + summary.environment.name;

            if (summaryFlag) {
                text += '\n\nSummary: ';
                text += '\nTotal of script: ' + run.stats['testScripts'].total;
                text += '\nTotal of failed script: ' + run.stats['testScripts'].failed;
                text += '\n\nTotal of assertions: ' + run.stats['assertions'].total;
                text += '\nTotal of failed assertions: ' + run.stats['assertions'].failed;
            }

            if (resultFlag) {
                text += '\n\nResult: ';
                for (let execution of executions) {
                    for (let item of execution.assertions) {
                        if (item.error == null) {
							text += '\nCase: ' + item.assertion;
                        }
                    }
                }
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
