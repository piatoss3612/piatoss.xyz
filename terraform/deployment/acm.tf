# acm certificate
# caution: cert only be available in us-east-1 region
resource "aws_acm_certificate" "piatoss_cert" {
  domain_name               = aws_route53_zone.piatoss_zone.name
  subject_alternative_names = ["*.${aws_route53_zone.piatoss_zone.name}"]
  validation_method         = "DNS"

  provider = aws.us-east-1

  tags = {
    Name        = "Piatoss Certificate"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}

# validate the certificate
resource "aws_acm_certificate_validation" "piatoss_cert_validation" {
  certificate_arn         = aws_acm_certificate.piatoss_cert.arn
  validation_record_fqdns = [aws_route53_record.piatoss_cert_validation.fqdn]
  provider                = aws.us-east-1
}
