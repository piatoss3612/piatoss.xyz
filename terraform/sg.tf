resource "aws_security_group" "piatoss_alb_sg" {
  name        = "piatoss-alb-sg"
  description = "Piatoss ALB Security Group"
  vpc_id      = aws_vpc.piatoss_vpc.id

  ingress {
    description = "Allow HTTP inbound traffic"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTPS inbound traffic"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "Piatoss ALB Security Group"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}
