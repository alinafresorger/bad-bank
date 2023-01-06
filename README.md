# Bad Bank

## Description Of The Project:

Bank simulation. You can open an account, deposit, withdraw and check the balance.
Use at your own risk.

## How To Run:

1. Download repository to your local machine
2. In the terminal run the following:
   ```bash
   $ docker-compose up
   ```
3. Go to http://localhost:3000/

## How to deploy

First, build & push the image to Docker Registry:

```bash
$ docker compose build
$ docker compose push badbankbackend
```

Then SSH to production server:

```bash
$ ssh root@146.190.123.193
```

On production server:

```bash
$ docker compose pull
$ docker compose up -d
```

Run `apt install docker-compose` once after DO droplet has been created.

## Technology used:

MERN stack, Docker, Digital Ocean

## Roadmap Of Future Improvements:

1. Add authentication
2. Add "if" condition to check NaN deposits and withdrawals
3. Organize "All Data" page

## Images

<img src="BB-1.png" width="350"> 
<img src="BB-2.png" width="550"> 
<img src="BB-3.png" width="550">

## License Information:

MIT License
