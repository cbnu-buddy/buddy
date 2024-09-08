import mysql, { Connection } from 'mysql';

let connectDB: Promise<Connection>;

const dbConfig = {
  host: process.env.NEXT_PUBLIC_MYSQL_HOST,
  user: process.env.NEXT_PUBLIC_MYSQL_USER,
  password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
  database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
};

if (process.env.NODE_ENV === 'development') {
  if (!global._mysql) {
    global._mysql = new Promise<Connection>((resolve, reject) => {
      const connection = mysql.createConnection(dbConfig);
      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL database', err);
          reject(err);
        } else {
          console.log('Connected to MySQL database');
          resolve(connection);
        }
      });
    });
  }
  connectDB = global._mysql;
} else {
  connectDB = new Promise<Connection>((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL database', err);
        reject(err);
      } else {
        console.log('Connected to MySQL database');
        resolve(connection);
      }
    });
  });
}

export { connectDB };

// Declare a global variable for TypeScript to avoid redeclaration error
declare global {
  var _mysql: Promise<Connection> | undefined;
}
