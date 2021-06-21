## 💚️ Mongo Atlas Guide 
-----------------
1. Go to [MongoDB cloud atlas](https://www.mongodb.com/cloud/atlas)

2. Sign up if you don't have an account already or log in if you have one already.
PS: If you don't want to use your email, go to https://temp-mail.org/en/ and generate a temporary disposable email address uwu)/
3. Create a new cluster on Mongo Atlas. [It takes time, so don't worry]
4. After creating a cluster, click on the 'CONNECT' button on the cluster which you've created.
5. On Setup connection security, I'd recommend you to add 'Your Current IP Address' for security concerns but if you are not willing to go through a little bit of pain, then simply add 'Access from anywhere. Also, you can change this anytime by opening your "IP Access list tab".
6. Then, create a database user, fill up the name and password and MAKE SURE TO REMEMBER THEM.
7. Click on the "Choose a connection method" and then click on the "Connect Your Application" option.
8. Finally, on the "Connect" tab select "Nodejs" as _DRIVER_ with "3.6 or later" in _VERSION_.
9. Copy the connection string that is provided below and paste it somewhere and replace <password> with 'the password you added while creating database user', also make sure to remove '< >' these from <yourPassword>. This will be your _MONGO CLUSTER URI_.
#### Example [Mongo Atlas Cluster URI]
```mongodb+srv://NekoDaKamiSama:kamisamaofdaculture@cluster0.v93qb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority```

10. That's it You now have a MongoDB cluster hosted on Mongo-Atlas. You can use this cluster for other projects too.