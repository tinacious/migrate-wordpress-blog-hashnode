# Hashnode blog scripts

Scripts for automating blog maintenance.


- [Bulk string replacement](#bulk-string-replacement)
  - [Usage](#usage)
- [WordPress-Hashnode Migrator](#wordpress-hashnode-migrator)
  - [Usage](#usage-1)
  - [Scripts](#scripts)
    - [Set up your environment variables](#set-up-your-environment-variables)
    - [Clean the posts](#clean-the-posts)
    - [Publish new posts](#publish-new-posts)


## Bulk string replacement

This script programmatically downloads all blog posts and replaces strings within that post. This is useful when moving to a different CDN service.


### Usage

Install dependencies:

```
npm install
```

Specify the strings to replace as environment variables:

```sh
\
OLD_STRING="https://tinaciousdesign.imfast.io" \
NEW_STRING="https://s3-us-west-2.amazonaws.com/blog.tinaciousdesign.com" \
  npm run replace
```


## WordPress-Hashnode Migrator

This is a set of scripts and instructions to facilitate migrating a blog from WordPress to Hashnode.

### Usage

Use the following guide as a walkthrough for this process:

[Migrating my blog from WordPress to Hashnode](https://blog.tinaciousdesign.com/migrating-my-blog-from-wordpress-to-hashnode-ckdgzbasn00zcdns1bmm2dj76)



### Scripts

Install dependencies:

```
npm install
```

#### Set up your environment variables

Set the required Hashnode secrets as environment variables in the `.env` file. See `.env.sample` for an example.

```
mv .env.sample .env
```

Open the `.env` file and edit it.


#### Clean the posts

This operation is like drinking a kale and cucumber smoothie. It processes the posts in `./posts.json` and performs the following actions:

- removes dirty attributes from content HTML
- converts post content to Markdown
- writes a new file in `./posts/cleaned.json`


```
npm run cleanse
```

#### Publish new posts

Once your posts are ready to be published, run the following script.

```
npm run migrate
```
