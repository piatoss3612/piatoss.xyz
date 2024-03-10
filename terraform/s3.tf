# s3 bucket for website
resource "aws_s3_bucket" "piatoss_bucket" {
  bucket = "piatoss.xyz"

  tags = {
    Name        = "Piatoss Bucket"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}

# allow cloudfront to access s3 bucket
resource "aws_s3_bucket_policy" "allow_cloudfront" {
  bucket = aws_s3_bucket.piatoss_bucket.id
  policy = data.aws_iam_policy_document.allow_cloudfront_access_to_s3_bucket.json
}

# ownership controls for s3 bucket
resource "aws_s3_bucket_ownership_controls" "piatoss_bucket_ownership_controls" {
  bucket = aws_s3_bucket.piatoss_bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# public access block for s3 bucket
resource "aws_s3_bucket_public_access_block" "piatoss_bucket_public_access_block" {
  bucket = aws_s3_bucket.piatoss_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# s3 bucket acl
resource "aws_s3_bucket_acl" "piatoss_bucket_acl" {
  bucket = aws_s3_bucket.piatoss_bucket.id

  depends_on = [
    aws_s3_bucket_ownership_controls.piatoss_bucket_ownership_controls,
    aws_s3_bucket_public_access_block.piatoss_bucket_public_access_block
  ]

  acl = "private"
}

resource "aws_s3_bucket_website_configuration" "piatoss_bucket_website_configuration" {
  bucket = aws_s3_bucket.piatoss_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}
