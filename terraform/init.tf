# s3 bucket for terraform backend
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
