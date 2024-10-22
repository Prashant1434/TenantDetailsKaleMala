### Mysql Query To Create Table : 

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roomNo VARCHAR(20) NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    panNo VARCHAR(20) NOT NULL,
    aadharNo VARCHAR(20) NOT NULL,
    mobileNo VARCHAR(15) NOT NULL,
    altMobileNo VARCHAR(15),
    photo VARCHAR(255),      -- Path or URL of the main photo
    aadharPhoto VARCHAR(255), -- Path or URL of the Aadhaar photo
    panPhoto VARCHAR(255),    -- Path or URL of the PAN photo
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE dependents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    relation VARCHAR(50) NOT NULL,
    dependentMobileNo VARCHAR(15),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

### Mysql Datbase Details : 
  host: 'localhost',
  user: 'root',
  password: 'ketaki@04',
  database: 'tenant_details',
