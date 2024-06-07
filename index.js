// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({region: 'sa-east-1'});

function receiveSNS(event){
    const message = event.Records[0].Sns.Message;
    console.log(message);

    return message;
}

async function sendSNS(topic_arn, message){
    console.log('::2)into the function::');
    

    // Create publish parameters
    var params = {
        Message: message, /* required */
        TopicArn: topic_arn
    };
    console.log('::3)showing params::');
    console.log(params);

    // Create promise and SNS service object
    console.log('::4)creating promise::');
    try {
        var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

        // Handle promise's fulfilled/rejected states
        let result = '';
        console.log('::5)handling promise::');
        await publishTextPromise
            .then(
                function(data) {
                    console.log('::6)data promise::');
                    result+=`Message ${params.Message} sent to the topic ${params.TopicArn}`;
                    result+=`\nMessageID is ${data.MessageId}`;
                    console.log(result);        
                    return result;
                })
            .catch(            
                function(err) {
                    console.log('::7)error promise::');
                    console.error(err, err.stack);
                    result+=err;
                }
            );
        console.log('::10)end::');
    } catch (error) {
        console.log('::8)error catch::');
        console.log(error);
    }
    
}

exports.handler =  async function(event, context) {
    const type = 'send';
    
    let result ='';
    if(type === 'receive'){
        result = receiveSNS(event);
    }
    else{
        const topic_arn = 'arn:aws:sns:sa-east-1:513179228934:topic-test';
        const message = event['body'];
        console.log('::1)entering the function::');
        result = sendSNS(topic_arn, message);
        return result;
    }
    
    
    
}