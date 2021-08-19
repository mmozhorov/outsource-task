<h1>Animal-App</h1>

<p>To start app locally:</p>
<code>
     docker-compose up -d
</code>>

<p>To stop app locally:</p>
<code>
     docker-compose down --rmi all
</code>>

<p>
    App will work on 8080 port <br/>
    There are two endpoints: <br/>
    <code>
        GET http://localhost:8080/animals
    </code>
    <br/>
    <code>
        POST http://localhost:8080/animals
        <pre>
        With body: {
            "kind": string,
            "positionX": number,
            "positionY": number
        }
        </pre>
    </code>
</p>



