resource "aws_alb" "piatoss_alb" {
  name                             = "piatoss-alb"
  internal                         = false
  security_groups                  = [aws_security_group.piatoss_alb_sg.id]
  subnets                          = aws_subnet.piatoss_subnet[*].id
  enable_cross_zone_load_balancing = true
  idle_timeout                     = 60

  tags = {
    Name        = "Piatoss ALB"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}

resource "aws_alb_target_group" "piatoss_tg" {
  name     = "piatoss-tg"
  port     = 8080
  protocol = "HTTP"
  vpc_id   = aws_vpc.piatoss_vpc.id

  health_check {
    path                = "/ping"
    protocol            = "HTTP"
    interval            = "300"
    timeout             = "120"
    healthy_threshold   = "2"
    unhealthy_threshold = "10"
    matcher             = "200-399"
  }

  stickiness {
    type    = "lb_cookie"
    enabled = true
  }

  tags = {
    Name        = "Piatoss Target Group"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}

resource "aws_lb_listener" "piatoss_http_listener" {
  load_balancer_arn = aws_alb.piatoss_alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }

  tags = {
    Name        = "Piatoss HTTP Listener"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}

resource "aws_lb_listener" "piatoss_https_listener" {
  load_balancer_arn = aws_alb.piatoss_alb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_acm_certificate.piatoss_cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.piatoss_tg.arn
  }

  tags = {
    Name        = "Piatoss HTTPS Listener"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}
