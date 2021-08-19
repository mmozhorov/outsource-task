<h1>CloudX-Shop</h1>
<p>To run PostgreSQL locally:</p>
<code>
     docker run -it -e "POSTGRES_HOST_AUTH_METHOD=trust" -p 5432:5432 postgres
</code>

<p>In the ./config/dump.sql you can find mocked data</p>

<p>To build Project's docker image put next command:</p>
<code>
    docker build . -t cloudx
</code>

<p>To run docker container:</p>
<code>
    docker run -p 8080:8080 -d cloudx
</code>

<p>To remove docker image:</p>
<code>
    docker rmi [ image-id ]
</code>

<p>To see te logs of docker image:</p>
<code>
    docker logs [ container id ]
</code>>

<p>To stop docker container:</p>
<code>
    docker stop [ container id ]
</code>>

<hr/>

<p>To start app locally:</p>
<code>
     docker-compose up -d
</code>>

<p>To stop app locally:</p>
<code>
     docker-compose down --rmi all
</code>>



