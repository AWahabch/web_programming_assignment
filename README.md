# Web-Programming-Assignment2

# DOCUMENTATION

## GIT	

The code has two separate files front-end and back-end. Another file Init Data is there to give an inital data for the testing of the database integration with the chat app. It provides with pre stored users and their roles. The back-end part has all the main components and files inside the src file. Inside the src file are all the components devided by their roles, configurations, commons and plugins. The key entry point is in index.ts file which connects to database.ts and server.ts file. 

Git has been used to ensure version control and commits were made after finishing each component entirely. A better approach would be commiting after completion of an important code block so role back to old code.

## DATA STRUCTURES

MongoDB database was used for storing and accessing the necessary information throughout this project. Previously JSON files were used to store information regarding user, channels, groups, chat and so on. That has been upgraded to a database for this assignment.
Interfaces have been used to describe a virtual structure making type-checking a lot easier. Mongoose schema has been used to store the data for each component namely Users, user roles, user channels, user activities, roles, messages, groups, and channels. Below is a description for the schema used for each component.

### Users 
This component stores information related to a user and has the necessary functions taking part in the overall implementation. 

```
export const UserSchema = new Mongoose.Schema( 
  {
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  imageUrl: { type: String },
  password: { type: String, required: true },
  isVerify: { type: Boolean },
  },
  {
  timestamps: true
  });
```

Each field is defined by its data type and whether or not it should be a compulsory input, the email address has a functionality of being unique and time stamps are used to store time when a user was created or when it was updated. All these field have been predefined in an interface called IUser in the Document.

```
export interface IUser extends Mongoose.Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updateAt: Date;
  imageUrl: string;
  isVerify: boolean;
  validatePassword(requestPassword): boolean;
}
```

### Groups 
This component stores the basic information about a group such as the name of the group and when it was created or updated. 

```
export const GroupSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true
  });
  ```
  
The name is defined by the data type being a String and making it a compulsory input at the time of creation. Time stamps simply store the time at the time of creation or when updated. The interface used for this is called IGroup.

```
export interface IGroup extends Mongoose.Document {
  name: string;
  createdAt: Date;
  updateAt: Date;
}
```

### Channels
This component stores the basic information about a channel same as the group but this time with a group ID which makes the identification and implementation of the whole channel group infrastructure easier.

```
export const ChannelSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    groupId: { type: String, required: true },
  },
  {
    timestamps: true
  });
  ```

The interface used for this component is as follows.

```
export interface IChannel extends Mongoose.Document {
  name: string;
  groupId: string;
  createdAt: Date;
  updateAt: Date;
}
```


### Messages 
This component is used to store each message and the information regarding the message, this helps in implementing the history function of the assignment. It stores the user’s ID, channel ID, the type of message, its content, the time of message and time of updating the message. 

```
export const MessageSchema = new Mongoose.Schema(
  {
    userId: { type: String, required: true },
    channelId: { type: String, required: true },
    type: { type: String },
    content: { type: String },
  },
  {
    timestamps: true
  });
  ```

The interface defined for this is as follows.

```
export interface IMessage extends Mongoose.Document {
  userId: string;
  channelId: string;
  type: string;
  content: string;
  createdAt: Date;
  updateAt: Date;
}
```

### Roles

This component simply stores the roles and their creations date and time. This is helpful when keeping track of history.

```
export const RoleSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true
  });
```  
  
The interface used for this is as follows.

```
export interface IRole extends Mongoose.Document {
  name: string;
  createdAt: Date;
  updateAt: Date;
}
```


### User Roles

This components is used to store the roles assigned to each user. It acts as a crucial part when implementing the user administration function and decides what a user can see and what functionalities a user can access in the chat application. For example if the user is assigned the role of a super admin, it can access all creation, updating and deletion functions associated with the chat application on the admin page.

```
export const UserRoleSchema = new Mongoose.Schema(
  {
    roleId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true
  });
  ```

### User Activities 

This component is used to store and keep track of the activities performed by a user. It records the channel the activity took place in, ID of the user, the action made by the user and the time stamps. The actions are defined by a number where 1 represents joining, 2 represent leaving and so on.

```
export const UserActivitySchema = new Mongoose.Schema(
  {
    channelId: { type: String, required: true },
    userId: { type: String, required: true },
    action: { type: Number, required: true }
  },
  {
    timestamps: true
  });
```

The interface used for this is as follows.

```
export interface IUserActivity extends Mongoose.Document {
  channelId: string;
  userId: string;
  action: Number; //1: join; 2: leave; 3...
  createdAt: Date;
  updateAt: Date;
}
```

### User Channels

This components is used to store the channel related information. It keeps tracks of all channel names, the users for each channel and other necessary information that comes in handy in the application. 

```
export const UserChannelSchema = new Mongoose.Schema(
  {
    channelId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true
  });
```

The interface used for this is as follows.

```
export interface IUserChannel extends Mongoose.Document {
  channelId: string;
  userId: string;
  createdAt: Date;
  updateAt: Date;
}
```


## CLIENT VS SERVER RESPONSIBILITIES


## REST API


### GET: /channels/info/{id}

  •	Description: “Get Channel Info”

  •	Used to get information regarding a specific channel 

  •	Uses ID to find the specific channel information

  •	Has a separate handler called channelController.infoChannel

  •	Returns channel name, timestamp information and group its associated to etc.


### GET: /channels/group/{groupId}

  •	Description: “Get channel by channel”

  •	Used to get all channels in a group.

  •	Uses group ID to find liked channels.

  •	Has a separate handler called channelController.listChannelByGroup.

  •	Returns names of channels in the specified group.


### GET: /channels

  •	Description: “Get channel info”

  •	Used to get all the channels that exist.

  •	Uses a handler called channelController.listChannel.

  •	Returns a list of channels that exist up to date.


### GET: /groups/info/{id}

  •	Description: “Get group Info”

  •	Used to get information regarding a specific group.

  •	Uses ID to find the specific channel information

  •	Has a separate handler called groupController.infoGroup

  •	Returns group name, timestamp information and channels it has etc.


### GET: /groups

  •	Description: “Get group info”

  •	Used to get all the groups that exist.

  •	Has a separate handler called groupController.listGroup.

  •	Returns a list of groups that exist up to date.


### GET: /messages/channel/{channelId}

  •	Description: “Create a message”

  •	Used to view message history of a channel 

  •	Uses channel ID to locate history.

  •	Has a separate handler called messageController.listMessageByChannel

  •	Returns messages.


### GET: /roles/info/{id}

  •	Description: “Get role info”

  •	Used to get the role of a user.

  •	Uses an ID to locate the role.

  •	Has a separate handler called roleController.infoRole.

  •	Returns the role found.


### GET: /roles

  •	Description: “Get role info”

  •	Used to get the list of roles.

  •	Has a separate handler called roleController.listRole.

  •	Returns a list of roles.


### GET: /userActivities/channel/{channelId}

  •	Description: “Get userActivity info”

  •	Used to get the activity of a user in a channel.

  •	Uses a channel ID to locate the Activity.

  •	Has a separate handler called userActivityController.listUserActivityByChannel.

  •	Returns the activity found.


### GET: /userActivities/user/{userId}

  •	Description: “Get userActivity info”

  •	Used to get all the activity of a user.

  •	Uses a user ID to locate the Activity.

  •	Has a separate handler called userActivityController.listUserActivityByUser.

  •	Returns the activity found.


### GET: /userChannels/channel/{channelId}

  •	Description: “Get userChannel info”

  •	Used to get all the users in a channel.

  •	Uses a channel ID to locate the users.

  •	Has a separate handler called userChannelController.listUserChannelByChannel.

  •	Returns the users found.


### GET: /userChannels/channel/{userId}

  •	Description: “Get userChannel info”

  •	Used to get all the channels a user is part of.

  •	Uses a user ID to locate the channels.

  •	Has a separate handler called userChannelController.listUserChannelByUser.

  •	Returns the channels found.


### GET: /userRoles/role/{roleId}

  •	Description: “Get userRole info”

  •	Used to get all the users of the specified role.

  •	Uses a role ID to locate the roles.

  •	Has a separate handler called userRoleController.listUserRolesByRole.

  •	Returns the users found.


### GET: /userRoles/role/{userId}

  •	Description: “Get userRole info”

  •	Used to get all roles of the specified user.

  •	Uses a user ID to locate the roles.

  •	Has a separate handler called userRoleController.listUserRolesByUser.

  •	Returns the roles found.


### GET: /users/info

  •	Description: “get user info”

  •	Used to get the information of a user when logged in.

  •	Has a separate handler called userController.infoUser.

  •	Has a separate validator called UserValidator.jwtValidator

  •	Either returns user information or takes to login page if no user found.


### GET: /users

  •	Description: “get user list”

  •	Used to list all users when logged in.

  •	Has a separate handler called userController.listUser.

  •	Has a separate validator called UserValidator.jwtValidator

  •	Either returns user information or takes to login page.


### GET: /users/image/{file*}

  •	Used to get the image file uploaded by the user.

  •	Uses a directory called uploads.


### DELETE: /channels

  •	Description: “Delete Channel”

  •	Used to delete a specific channel from existing channels.

  •	Uses channel ID to locate and delete channel.

  •	Has a separate handler called ChannelController.deleteChannel

  •	Returns successful deletion message.


### DELETE: /groups/{id}

  •	Description: “Delete Group”

  •	Used to delete a specific group from existing groups.

  •	Uses ID to locate and delete channel.

  •	Has a separate handler called groupController.deleteGroup

  •	Returns successful deletion message.


### DELETE: /messages

  •	Description: “Delete message”

  •	Used to delete a message

  •	Has a separate handler called messageController.deleteMessage.

  •	Returns successful deletion message.


### DELETE: /roles/{id}

  •	Description: “Delete role”

  •	Used to delete a role.

  •	Uses ID to locate the role.

  •	Has a separate handler called roleController.deleteRole.

  •	Returns successful deletion message.


### DELETE: /userChannels

  •	Description: “Delete userChannel”

  •	Used to delete a user from channel.

  •	Has a separate handler called userChannelController.deleteUserChannel

  •	Returns successful deletion message.


### DELETE: /userRoles

  •	Description: “Delete userRole”

  •	Used to delete a user role.

  •	Has a separate handler called useRoleController.deleteUserRole

  •	Returns successful deletion message.


### DELETE: /users

  •	Description: “delete current user”

  •	Used to delete a user.

  •	Has a separate controller called userController.deleteUser

  •	Has a separate validator called UserValidator.jwtValidator

  •	Returns either successful deletion message or tells user that it does not have authority


### PUT: /channels

  •	Description: “Update Channel Info”

  •	Used to update a channel’s information.

  •	Has a separate handler called channelController.updateChannel.

  •	Has a separate validator called ChannelValidator.updateChannelModel.

  •	Returns successful update message.


### PUT: /groups

  •	Description: “Update group Info”

  •	Used to update a groups’s information.

  •	Has a separate handler called groupController.updateGroup.

  •	Has a separate validator called GroupValidator.updateGroupModel.

  •	Returns successful update message.


### PUT: /roles

  •	Description: “Update role Info”

  •	Used to update a user role.

  •	Has a separate handler called roleController.updateRole.

  •	Has a separate validator called RoleValidator.updateRoleModel.

  •	Returns successful update message.


### PUT: /userChannels

  •	Description: “Update userChannel Info”

  •	Used to update a user to a channel.

  •	Has a separate handler called userChannelController.updateUserChannel.

  •	Has a separate validator called userChannelValidator.updateUserChannelModel.

  •	Returns successful update message.


### PUT: /userRoles

  •	Description: “Update userRole Info”

  •	Used to update a user role.

  •	Has a separate handler called userRoleController.updateUserRole.

  •	Has a separate validator called userRoleValidator.updateUserRoleModel.

  •	Returns successful update message.


### PUT: /users

  •	Description: “update current user info”

  •	Used to update user information.

  •	Has a separate handler called userController.updateUser.

  •	Has a separate validator called UserValidator.jwtValidator.

  •	Returns either a successful update message or tell the user it does not have authority.


### POST: /channels

  •	Description: “create a channel”

  •	Used to create a new channel.

  •	Has a separate handler called “channelController.createChannel.

  •	Has a separate handler called “ChannelValidator.createChannelModel.

  •	Returns successful creation message.


### POST: /groups

  •	Description: “create a group”

  •	Used to create a new group.

  •	Has a separate handler called “groupController.createGroup

  •	Has a separate handler called “GroupValidator.createGroupModel.

  •	Returns successful creation message.


### POST: /roles

  •	Description: “create a role”

  •	Used to create a new role for a user.

  •	Has a separate handler called “roleController.createRole

  •	Has a separate handler called “RoleValidator.createRoleModel.

  •	Returns successful creation message.


### POST: /userActivities

  •	Description: “Create a userActivity”

  •	Used to create the activity of a user.

  •	Has a separate handler called userActivityController.createUserActivity.

  •	Returns successful creation message.


### POST: /userChannels

  •	Description: “Create a userActivity”

  •	Used to create the activity of a user.

  •	Has a separate handler called userChannelController.createUserChannel.

  •	Returns successful creation message.


### POST: /userRoles

  •	Description: “Create a userRole”

  •	Used to create the role of a user.

  •	Has a separate handler called userRoleController.createUserRole.

  •	Returns successful creation message.


### POST: /users/uploadImage

  •	Description: “update user’s image”

  •	Used to update the user avatar/image.

  •	Has a separate handler called userController.updateUserImage.

  •	Has a separate validator called UserValidator,jwtValidator.

  •	Returns successful upload message.


### POST: /users

  •	Description: “user created”

  •	Used to create a user.

  •	Has a separate handler called userController.createUser.

  •	Has a separate validator called UserValidator.createUserModel.

  •	Returns successful creation message.


### POST: /users/login

  •	Description: “login a user”

  •	Used for user login functionality.

  •	Has a separate handler called userController.loginUser.

  •	Has a separate validator called UserValidator.loginUserModel.

  •	Returns successful logged in message.


# Angular Architecture

## Components

### Login

  Login component makes for one of the two pages of the website and it allows the user to enter in their username 
  password in the input fields. The login component uses the Authentication Service to authenticate the user.
  If the user is authenticated, the router navigates to the home page.
 
### Logout

  The logout component has no html and simply reroutes the user to the login page using the Authentication Service.
  
  
### Home 

  The home component makes up for the chatting part of the second page of the web app, with many connecting modal components (such as 
  the side navigation). On initialisation this component communicates with the Chat Service to display all the messages for 
  the current selected channel. Messages can be sent in this component using the Chat Service also.
  
### Edit Profile

  This modal takes care of the profile editing, here you can edit the profile picture, note that its validity
  is checked (i.e. can upload .jpeg but not a .txt file). Other checks include file name length (max 15) and file size (max 1mb).
 
### Channel Management 

  This modal allows the user to create, edit and delete channels belonging to specific groups. All the functionality 
  comes from the Channel Service.
  
### Group Management

  This modal is the same as the above but for the groups, and all the functionality comes from the Group Service.
  
### User Management

  This modal is the same as the above but for the users, and all the functionality comes from the Users Service.
  
### Navigation

  Two modals are here, on the top navigation the username is taken from local storage, when clicked on it will show
  the user options and changes to the other modal when edit profile is clicked on for example. The Side navigation
  displays all the available groups and channels.
  
## Models
### Channel
  Describes the structure of a channel, properties include id, name and group (must import Group model)
### Group
  Describes the structure of a group, properties include id, name and channels (import Channel model, initially empty channel)
### Role
  Describes the structure of a role, properties include id and name
### User
  Describes the structure of a user, properties include id, channels and role (both initialised to be empty),
  username, email and password.
  
## Services
  
### Authentication Service

### Channel Service

### Chat Service

### Ensure Authentication Service 

  Used when empty url is used ' ' to see if the user has already logged in (using the access token).
  
### Groups Service

### Messages Service

### Profile Service

### Users Service
  
