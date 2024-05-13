Example codebase to test, build, deploy your TypeScript/JavaScript codes(static assets) to AWS S3 with GitHub Actions using OpenID Connect(OIDC).

The workflow is:

1. Install Node package dependencies
2. (ES)Lint the source code
3. Test the source code with Jest
4. Build(compile) the source code
5. Deploy built files to the S3 bucket

## Steps

1. Create a GitHub repository
2. Create an S3 bucket
3. Add an identity provider to AWS
4. Update the workflow

## Example JSONs

The example trust policy of IAM Role you assign:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Principal": {
                "Federated": "arn:aws:iam::YOUR_AWS_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
            },
            "Condition": {
                "StringEquals": {
                    "token.actions.githubusercontent.com:aud": [
                        "sts.amazonaws.com"
                    ],
                    "token.actions.githubusercontent.com:sub": [
                        "repo:YOUR_GITHUB_ACCOUNT/YOUR_GITHUB_REPOSITORY:ref:refs/heads/main"
                    ]
                }
            }
        }
    ]
}
```

The inline permission you must attach to your IAM role:

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "VisualEditor0",
			"Effect": "Allow",
			"Action": [
				"s3:PutObject",
				"s3:GetObject",
				"s3:ListBucket",
				"s3:DeleteObject"
			],
			"Resource": [
				"arn:aws:s3:::YOUR_BUCKET_NAME",
				"arn:aws:s3:::YOUR_BUCKET_NAME/*"
			]
		}
	]
}
```

> I recommend specifying the directory like `assets`, `build` in the policy. 

## Resources

### OIDC

- [Configure AWS Credentials for GitHub Actions](https://github.com/aws-actions/configure-aws-credentials)
- [Configuring OpenID Connect in Amazon Web Services](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
- [Create an OpenID Connect (OIDC) identity provider in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)
- [Create a role for OpenID Connect federation (console)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html)
- [Use IAM roles to connect GitHub Actions to actions in AWS](https://aws.amazon.com/jp/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/)

### Caching

- https://github.com/actions/setup-node
