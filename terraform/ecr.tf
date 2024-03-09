resource "aws_ecr_repository" "piatoss_ecr" {
  name                 = "piatoss"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "Piatoss ECR Repository"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}

resource "aws_ecr_lifecycle_policy" "piatoss_ecr_lifecycle_policy" {
  repository = aws_ecr_repository.piatoss_ecr.name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Expire images older than 14 days",
            "selection": {
                "tagStatus": "untagged",
                "countType": "sinceImagePushed",
                "countUnit": "days",
                "countNumber": 14
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}
