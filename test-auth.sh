#!/bin/bash
# Test script for TrustHire authentication

echo "🧪 TrustHire Authentication Test Suite"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
API_URL="http://localhost:5000/api"
ADMIN_EMAIL="jayantkumar@gmail.com"
ADMIN_PASSWORD="Jayant@123"
USER_EMAIL="jayan1504@gmail.com"
USER_PASSWORD="jayant222"

# Test 1: Check server health
echo -e "${YELLOW}Test 1: Checking server health...${NC}"
HEALTH=$(curl -s http://localhost:5000/health)
if echo $HEALTH | grep -q "running"; then
    echo -e "${GREEN}✅ Server is running${NC}"
else
    echo -e "${RED}❌ Server is not responding${NC}"
    exit 1
fi
echo ""

# Test 2: Admin Login
echo -e "${YELLOW}Test 2: Testing Admin Login...${NC}"
ADMIN_LOGIN=$(curl -s -X POST $API_URL/admin/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}")

if echo $ADMIN_LOGIN | grep -q "\"success\":true"; then
    echo -e "${GREEN}✅ Admin login successful${NC}"
    ADMIN_TOKEN=$(echo $ADMIN_LOGIN | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    echo "   Token: ${ADMIN_TOKEN:0:20}..."
else
    echo -e "${RED}❌ Admin login failed${NC}"
    echo "   Response: $ADMIN_LOGIN"
fi
echo ""

# Test 3: User Login
echo -e "${YELLOW}Test 3: Testing User Login...${NC}"
USER_LOGIN=$(curl -s -X POST $API_URL/users/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$USER_EMAIL\",\"password\":\"$USER_PASSWORD\"}")

if echo $USER_LOGIN | grep -q "\"success\":true"; then
    echo -e "${GREEN}✅ User login successful${NC}"
    USER_TOKEN=$(echo $USER_LOGIN | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    echo "   Token: ${USER_TOKEN:0:20}..."
else
    echo -e "${RED}❌ User login failed${NC}"
    echo "   Response: $USER_LOGIN"
fi
echo ""

# Test 4: Admin Dashboard Access
if [ ! -z "$ADMIN_TOKEN" ]; then
    echo -e "${YELLOW}Test 4: Testing Admin Dashboard Access...${NC}"
    DASHBOARD=$(curl -s -X GET $API_URL/admin/dashboard/stats \
      -H "Authorization: Bearer $ADMIN_TOKEN")
    
    if echo $DASHBOARD | grep -q "\"success\":true"; then
        echo -e "${GREEN}✅ Admin dashboard accessible${NC}"
    else
        echo -e "${RED}❌ Admin dashboard access failed${NC}"
    fi
    echo ""
fi

# Test 5: User Profile Access
if [ ! -z "$USER_TOKEN" ]; then
    echo -e "${YELLOW}Test 5: Testing User Profile Access...${NC}"
    PROFILE=$(curl -s -X GET $API_URL/users/profile \
      -H "Authorization: Bearer $USER_TOKEN")
    
    if echo $PROFILE | grep -q "\"success\":true"; then
        echo -e "${GREEN}✅ User profile accessible${NC}"
    else
        echo -e "${RED}❌ User profile access failed${NC}"
    fi
    echo ""
fi

# Summary
echo "======================================"
echo -e "${GREEN}🎉 Authentication tests complete!${NC}"
echo ""
echo "Default Credentials:"
echo "  Admin: $ADMIN_EMAIL / $ADMIN_PASSWORD"
echo "  User:  $USER_EMAIL / $USER_PASSWORD"
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend:  $API_URL"
