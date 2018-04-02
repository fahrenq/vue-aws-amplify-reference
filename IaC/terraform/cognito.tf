resource "aws_cognito_user_pool" "main" {
  # name = "${local.prefix}"
  name = "${var.project_name}"

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length    = 6
    require_lowercase = false
    require_uppercase = false
    require_numbers   = false
    require_symbols   = false
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_LINK"
  }
}

resource "aws_cognito_user_pool_client" "web" {
  name = "web"

  generate_secret = false
  user_pool_id    = "${aws_cognito_user_pool.main.id}"
}

resource "random_string" "domain" {
  length  = 16
  special = false
  upper   = false
  number  = false
}

resource "aws_cognito_user_pool_domain" "main" {
  domain       = "${random_string.domain.result}"
  user_pool_id = "${aws_cognito_user_pool.main.id}"
}

resource "aws_cognito_identity_pool" "main" {
  # identity_pool_name               = "${local.prefix}"
  identity_pool_name               = "${var.project_name}"
  allow_unauthenticated_identities = false

  # Manually bound identity pool and user pool
  cognito_identity_providers {
    client_id     = "${aws_cognito_user_pool_client.web.id}"
    provider_name = "cognito-idp.us-east-1.amazonaws.com/${aws_cognito_user_pool.main.id}"
  }
}

resource "aws_iam_role" "cognito_authenticated" {
  # name = "cognito_${local.prefix}_authenticated"
  name = "cognito_${var.project_name}_authenticated"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "${aws_cognito_identity_pool.main.id}"
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "cognito_authenticated" {
  # name = "cognito_${local.prefix}_authenticated_policy"
  name = "cognito_${var.project_name}_authenticated_policy"
  role = "${aws_iam_role.cognito_authenticated.id}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "mobileanalytics:PutEvents",
        "cognito-sync:*",
        "cognito-identity:*"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
EOF
}

resource "aws_cognito_identity_pool_roles_attachment" "main" {
  identity_pool_id = "${aws_cognito_identity_pool.main.id}"

  roles {
    "authenticated" = "${aws_iam_role.cognito_authenticated.arn}"
  }
}

output "cognito_identity_pool_id" {
  value = "${aws_cognito_identity_pool.main.id}"
}

output "cognito_user_pool_id" {
  value = "${aws_cognito_user_pool.main.id}"
}

output "cognito_user_pool_web_client_id" {
  value = "${aws_cognito_user_pool_client.web.id}"
}
