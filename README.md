# SQUERA (ESKWELA + QUERY)

## Mission:
* Create reddit-like system for schools @ philippines (and scale to the moon)

## Main Features:
  * Posts + Comments (facebook-like)
  * Tags system (fetch tags from posts, track tags locally/globally)
  * Schools are grouped by school name/id, then by branch (moderated so
    that there are no duplicate schools)

## Features:
* Web + Mobile (React)
* For every school:
  * School rating
  * Description
  * Images

## Not prioritized features: 
  * File sharing
  * Events
  * Omegle like chat? (in-school/nearby schools matching algo)
  * Follow system for users
  * Reactions for posts
  
## Main Collections
* User
  * id:uuid
  * schoolsfollowing:Array
  * createdAt:date
* Post
  * id:uuid
  * text:string
  * schoolId:uuid
  * authorId:uuid
  * createdAt:date
  * updatedAt:date
* Comment
  * id:uuid
  * text:string
  * PostId:uuid
  * createdAt:date
  * updatedAt:date
* School
  * id:uuid
  * name:string
  * description:string
  * links:Array of links
* Image
  * forId:uuid
  * authorId: uuid
  * createdAt: date