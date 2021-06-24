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
  * role:number ( 0:member 1-4:priveleged(custom) 5:admin )
* Post
  * id:uuid
  * text:string
  * schoolId:uuid
  * createdBy:uuid
  * createdAt:date
  * updatedAt:date
* Comment
  * id:uuid
  * text:string
  * PostId:uuid
  * createdBy:uuid
  * createdAt:date
  * updatedAt:date
* School
  * id:uuid
  * name:string
  * description:string
  * isVerified: boolean
  * createdBy: uuid
  * updatedBy: uuid
  * createdAt:date
  * updatedAt:date
* Branch
  * id:uuid
  * schoolId: uuid
  * name:string
  * address:string
  * coordinates:Array of float
  * isVerified: boolean
  * createdBy: uuid
  * updatedBy: uuid
  * createdAt:date
  * updatedAt:date
* Image
  * forId:uuid
  * location: string
  * createdBy: uuid
  * createdAt: date
* Links
  * forId:uuid
  * uri: string
  * createdBy: uuid
  * updatedBy: uuid
  * createdAt: date