zip -r -D function.zip *
aws lambda update-function-code --region sa-east-1 --function-name sns-node --zip-file fileb://function.zip
