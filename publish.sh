# Example script to publish this package to a lambda function
# Modify FUNCTIONNAME for publishing on different environments
# Modify S3BUCKET for publishing on a different account
# Modify S3PREFIX for publishing different projects
# Running this scripts assumes the running user has aws credentials

FUNCTIONNAME=greeninvoice-dev-test-sale-pages-api-private-poc
S3BUCKET=greeninvoice-dev-releases
S3PREFIX=salepages-api-private
npm run bundle
cd bundle
zip lambda.zip lambda.js
cd ..
PACKAGEMD5=`md5 -q bundle/lambda.zip`
NOWUTC=`date -u +"%Y%m%d%H%M%S"`
aws s3 cp bundle/lambda.zip s3://$S3BUCKET/$S3PREFIX/$NOWUTC-$PACKAGEMD5.zip
aws lambda update-function-code --function-name $FUNCTIONNAME --s3-bucket $S3BUCKET --s3-key $S3PREFIX/$NOWUTC-$PACKAGEMD5.zip
aws lambda publish-version --function-name $FUNCTIONNAME --description "Uploaded from script on $NOWUTC"
