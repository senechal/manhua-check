# Manhua Check

*This is a work in progress, not suited to be pushed to chrome extension store.*

This is a usefull extension to maintain chapter count of manga/manhua you are reading.
It takes advantage of the Github gists, to sinc all instances of the extension so you can update your chapter count
anyware this is installed.

### how to use it.
You will have to have a [github](https://github.com/) account.

1. Create a new secret [gist](https://gist.github.com/).
2. Create a file called db.json (The name can be anything you want). Make it empty object `{}`.
3. Get a personal Github access token [here](https://github.com/settings/tokens/new). `gist` is the only scope you need.
4. Open Settings, cog icon top right corner, add the settings and click save.

You are done, you should be able to add a new Manhua/Manga title to the list and make updates.

#### Adding a new Manhua/Manga.
Fill the *New Title* input with the name of the Manhua/Manga and click the "Add New" button.
The title should be part of your list.
Clicking on the edit button on the right side of the name of the manhuas/mangas, you open a editing menu.
For each title there 4 possible actions:
- Add to counter, [+] button, it adds one to your chapter count.
- Edit the chapter counter (on the editing menu).
- activate/deactivate, this is to be used anyway you like, for a droped title, or something you lost count were you were, but you want to get back ot it.
- delete.