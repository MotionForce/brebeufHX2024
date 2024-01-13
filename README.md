# Brébeuf Nature Science Council
Connect people based on their interests using AI. 

## Installation
* Install a Postgres database and a Weaviate database. Change the URL for the Weaviate database to the correct one (but should be already good). Create a .env file and add a DATABASE_URL key to it.
```txt
DATABASE_URL=postgresql://username:password@host:port/mydb?schema=your_schema
```
* Clone the GitHub repo.
```git
git clone https://github.com/MotionForce/brebeufHX2024/
```
* Install the dependencies. We use PNPM, so you may need to install it aswell (Node version >= 18.13.0).
```cmd
(optional) npm install -g pnpm
pnpm install
```
* Push the Prisma ORM schema to the databse. **WARNING: POSSIBILITY OF DATA LOSS**.
```cmd
pnpm prisma db push
```
* Build the website.
```cmd
pnpm run build
```
* To preview the website, run the following:
```cmd
pnpm run preview
```
