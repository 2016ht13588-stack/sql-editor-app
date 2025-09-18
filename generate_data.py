import json
import random
from datetime import datetime, timedelta

# Generate 500 employee rows
employees = []
base_date = datetime(2020, 1, 1)
for i in range(1, 501):
    hire_date = base_date + timedelta(days=random.randint(0, 1825))
    salary = random.randint(40000, 150000)
    employees.append({
        'id': i,
        'name': f'Employee {i}',
        'email': f'employee{i}@company.com',
        'department': random.choice(['HR', 'Engineering', 'Sales', 'Marketing', 'Finance']),
        'position': random.choice(['Manager', 'Developer', 'Analyst', 'Designer', 'Sales Rep']),
        'salary': salary,
        'hire_date': hire_date.strftime('%Y-%m-%d')
    })

with open('src/data/employee.json', 'w') as f:
    json.dump(employees, f, indent=2)

# Generate 1000 users rows
users = []
for i in range(1, 1001):
    users.append({
        'id': i,
        'username': f'user{i}',
        'email': f'user{i}@example.com',
        'age': random.randint(18, 65),
        'city': random.choice(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']),
        'registration_date': (datetime.now() - timedelta(days=random.randint(0, 3650))).strftime('%Y-%m-%d')
    })

with open('src/data/users.json', 'w') as f:
    json.dump(users, f, indent=2)

print("Generated src/data/employee.json (500 rows) and src/data/users.json (1000 rows).")