# hosted zone for piatoss.xyz
resource "aws_route53_zone" "piatoss_zone" {
  name = "piatoss.xyz"

  tags = {
    Name        = "Piatoss Zone"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}

# acm certificate validation record
resource "aws_route53_record" "piatoss_cert_validation" {
  zone_id = aws_route53_zone.piatoss_zone.zone_id
  name    = tolist(aws_acm_certificate.piatoss_cert.domain_validation_options)[0].resource_record_name
  type    = tolist(aws_acm_certificate.piatoss_cert.domain_validation_options)[0].resource_record_type
  records = [tolist(aws_acm_certificate.piatoss_cert.domain_validation_options)[0].resource_record_value]
  ttl     = 60
}

# # record for piatoss.xyz
resource "aws_route53_record" "piatoss_record" {
  zone_id = aws_route53_zone.piatoss_zone.zone_id
  name    = "piatoss.xyz"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.piatoss_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.piatoss_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
