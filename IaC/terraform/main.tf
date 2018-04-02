provider "aws" {
  profile = "${var.aws_profile}"
  region  = "${var.aws_region}"
}

# locals {
#   prefix = "${var.project_name}-${terraform.workspace}"
# }

