# WordPress-Hashnode Migrator

This is a set of scripts and instructions to facilitate migrating a blog from WordPress to Hashnode.

## Usage

Use the following guide to hold your hand through this process: TODO

Install dependencies:

```
npm install
```

## Scripts

### Clean the posts

This operation is like drinking a kale and cucumber smoothie. It processes the posts in `./posts.json` and performs the following actions:

- removes dirty attributes from content HTML
- converts post content to Markdown
- writes a new file in `./posts/cleaned.json`


```
npm run cleanse
```

### Upload new posts

Set the required Hashnode secrets as environment variables in the `.env` file. See `.env.sample` for an example.

```
mv .env.sample .env
```

Open the `.env` file and edit it.
