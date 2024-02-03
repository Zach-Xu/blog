# Blog Public Types Documentation

## Home Page

### articles 

fetch 5 articles (first, fetch from pinned ones. if the number of pinned articles is less than 5, fetch the remainings from unpinned ones)

```ts 
interface Article {
    pinned:boolean
    date:string | Date
    tags: {
        id:number
        tagName:string
    }[]
    title:string
    summary:string
    category:{
        id:number
        name:string
    }
    thumbnail:string
}
```

### user card 

```ts
interface UserCard {
    avatar:string
    username:string
    articleCount:number
    categoryCount:number
    tagCount:number
    socials:{
        id:number
        name:string
        link:string
    }
}
```

### notice  

fetch the latest notice(announcement)

```ts
interface Notice {
    id:number
    content:string
}
```
### latest comments 

fetch latest 3 comments 

```ts
interface Comment {
    id:number
    avatar:string
    username:String
    date:string | Date
    message: string
}
```

### site stats 

```ts
interface SiteStats {
    articleCount:number
    uptime:date | string
    viewCount:number
}
```

