terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.25.0"
    }
  }
}

provider "aws" {
  region = "ap-northeast-2"
}

# s3 bucket
resource "aws_s3_bucket" "tfstate_bucket" {
  bucket = "piatoss-tfstate-bucket"

  tags = {
    Name        = "Piatoss Tfstate Bucket"
    Environment = "Dev"
  }
}

# versioning
resource "aws_s3_bucket_versioning" "tfstate_bucket_versioning" {
  bucket = aws_s3_bucket.tfstate_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

# server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "tfstate_bucket_sse" {
  bucket = aws_s3_bucket.tfstate_bucket.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# s3 arn
output "s3_bucket_arn" {
  value = aws_s3_bucket.tfstate_bucket.arn
}

// ==================================================================================================

# dynamodb
resource "aws_dynamodb_table" "tfstate_lock_table" {
  name             = "piatoss-tfstate-lock-table"
  billing_mode     = "PAY_PER_REQUEST"
  hash_key         = "LockID"
  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name        = "Piatoss Tfstate Lock Table"
    Environment = "Dev"
  }
}

# dynamodb arn
output "dynamodb_table_arn" {
  value = aws_dynamodb_table.tfstate_lock_table.arn
}
