# SELMA
This repository contains the code for SELMA, our semantic and local code search system. 

## Dependencies
You need to have Java 11+ installed on your system in order to use Terrier. In order to use our Transformer-based features, 
we recommend using a platform which has access to at least one GPU (with CUDA installed).


## Introduction

We will use two programs to deploy our app, namely [gunicorn](https://gunicorn.org/) and [nginx](https://www.nginx.com/).

- gunicorn is a python web server made for production (unlike flask's web server), and we will use it to run our backend app privately, on port 8000.
- nginx will serve the static files from our frontend app and it will make our backend public.

## Installing the retrievalsystem app

1. Connect to the server through ssh
2. Clone the retrievalsystem's app
3. Navigate to `retrievalsystem/frontend` and run `yarn`
4. Once the dependencies are installed, build the frontend app by running `yarn build`
5. Navigate to `retrievalsystem/backend` and create a venv: `python3 -m venv venv`
6. Activate the venv: `source venv/bin/activate`
7. Apply migrations to `app.db`: `flask db upgrade` (See \[6\])
8. Install the requirements: `pip install -r requirements.txt`
9. Install gunicorn: `pip install gunicorn`

## Installing and configuring nginx

1. If nginx is not already installed, then install it:

```bash
sudo apt update
sudo apt install nginx
```

1. nginx creates 2 folders: `/etc/nginx/sites-available` and `/etc/nginx/sites-enabled`.
   - Normally, it comes with a file `default.nginx` inside `sites-available` and a soft link to it inside `sites-enabled` . If that's the case, then delete these files.
2. Inside `sites-available` create a file `retrievalsystem.nginx`.
   - Paste the following text inside that file, chage the root's path and save it.

     ```bash
     server {
         # listen on port 80 (http)
         listen 80;
         # serve static files
         root /path/to/retrievalsystem/frontend/build;
         # tells nginx which file to serve when the client doesn't
         # request any file
         index index.html;
     
         # by specifying locations, nginx defines attributes that apply to
         # group of urls for any url starting with '/' nginx will see if
         # it can serve a file if $uri doesnt exist, then we try again,
         # but now we will treat it as a directory $uri/ if neither work,
         # then return 404 (not found)
         location / {
             try_files $uri $uri/ =404;
         }
     
         location /api/v1 {
             include proxy_params;
             # The proxy_pass command gives the address where the proxied
             # service is listening for requests.
             proxy_pass http://localhost:5000;
         }
     }
     ```
3. Create a soft-link for the file created in the previous step in `/etc/nginx/sites-enabled`

```
ln -s /etc/nginx/sites-available/retrievalsystem.nginx /etc/nginx/sites-enabled/retrievalsystem.nginx
```

## Installing and configuring gunicorn

- To install gunicorn, activate the desired virtual environment and run `pip install gunicorn`

We want to run gunicorn as a service, instead of opening a terminal and running the flask app by hand. This has the advantage that, even if the server is rebooted, the app will restart it self as soon as the server is powered again (nginx also runs as a service).

To do that, we will use `systemd`.

1. Navigate to `/etc/systemd/system`
2. Create a file: `touch retrievalsystem.service`
3. Paste the following text inside that file, **change the User, the WorkingDirectory and the ExecStart variables** and save it.

> :warning: The GPU-Server used by us is shared with other people, so the app should **not** start automatically. For that reason, we should change the 6th line of the file below from `Restart=always` to `Restart=no` when deplyoing there.

```bash
[Unit]
Description=Retrival System

[Service]
User=<username-of-who-is-running-the-service>
Restart=always
WorkingDirectory=/path/to/retrievalsystem
ExecStart=/path/to/retrievalsystem/backend/venv/bin/gunicorn -b localhost:5000 retrievalsystem:app

[Install]
WantedBy=networking.target
```

## Updating a deployed instance of the retrievalsystem app

If the app is already installed and all you wish is to update it, all you need to do is:

1. Update the project with `git pull`
2. (optional) Rebuild the frontend app:
   - Navigate to `retrievalsystem/frontend` and run `yarn build`

