# s3 bucket origin access identity
resource "aws_cloudfront_origin_access_identity" "s3_bucket_origin_access_identity" {
  comment = "Allows CloudFront to reach the S3 bucket"
}

# cloudfront access to s3 bucket policy
data "aws_iam_policy_document" "allow_cloudfront_access_to_s3_bucket" {
  statement {
    sid     = "Allow CloudFront access to S3 bucket"
    effect  = "Allow"
    actions = ["s3:GetObject"]
    resources = [
      "${aws_s3_bucket.piatoss_bucket.arn}/*",
    ]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.s3_bucket_origin_access_identity.iam_arn]
    }
  }
}

# cloudfront distribution
resource "aws_cloudfront_distribution" "piatoss_distribution" {
  aliases             = ["piatoss.xyz"]
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_200"

  origin {
    domain_name = aws_s3_bucket.piatoss_bucket.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.piatoss_bucket.id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.s3_bucket_origin_access_identity.cloudfront_access_identity_path
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.piatoss_cert.arn
    ssl_support_method  = "sni-only"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = aws_s3_bucket.piatoss_bucket.id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  tags = {
    Name        = "Piatoss Distribution"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.piatoss_distribution.id
}
