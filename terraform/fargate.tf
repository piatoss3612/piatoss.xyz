resource "aws_vpc" "piatoss_vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name        = "Piatoss VPC"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}

data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_subnet" "piatoss_subnet" {
  count = length(data.aws_availability_zones.available.names)

  vpc_id            = aws_vpc.piatoss_vpc.id
  cidr_block        = "10.0.${count.index}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]
  tags = {
    Name        = "Piatoss Subnet ${count.index}"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}

resource "aws_internet_gateway" "piatoss_igw" {
  vpc_id = aws_vpc.piatoss_vpc.id
  tags = {
    Name        = "Piatoss Internet Gateway"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}

resource "aws_route_table" "piatoss_public_route_table" {
  vpc_id = aws_vpc.piatoss_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.piatoss_igw.id
  }

  tags = {
    Name        = "Piatoss Public Route Table"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}

resource "aws_route_table_association" "piatoss_subnet_association" {
  count          = length(aws_subnet.piatoss_subnet)
  subnet_id      = aws_subnet.piatoss_subnet[count.index].id
  route_table_id = aws_route_table.piatoss_public_route_table.id
}
