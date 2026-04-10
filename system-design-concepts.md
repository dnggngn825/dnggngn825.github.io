# 98 System Design Concepts

---

## 1. Scalability
The ability of a system to handle increased load by adding resources. **Vertical scaling** adds more power to existing machines; **horizontal scaling** adds more machines.

## 2. Database
An organized collection of structured data stored electronically. Acts as the persistence layer for applications, supporting querying, indexing, and transactions.

## 3. API Design
The process of defining how software components communicate. Good API design prioritizes clarity, consistency, versioning, and backward compatibility.

## 4. Fault Tolerance
A system's ability to continue operating correctly even when one or more components fail. Achieved through redundancy, failover mechanisms, and graceful degradation.

## 5. Erasure Coding
A data protection method that breaks data into fragments, expands and encodes them with redundant pieces, and stores them across different locations — allowing recovery even if some fragments are lost.

## 6. Sharding
Horizontal partitioning of a database into smaller, more manageable pieces called shards. Each shard holds a subset of the data and lives on a separate node.

## 7. Event-Driven
An architectural pattern where components communicate by producing and consuming events. Decouples producers from consumers, enabling asynchronous, loosely coupled systems.

## 8. Bulkhead
An isolation pattern (named after ship compartments) that separates system resources per service or consumer. Prevents a failure in one part from cascading and exhausting resources elsewhere.

## 9. Blue-Green Deployment
A release strategy that maintains two identical production environments (blue = current, green = new). Traffic is switched to green after validation, enabling instant rollback.

## 10. Correlation ID
A unique identifier attached to a request that propagates across all services and logs as it flows through a distributed system. Essential for tracing and debugging end-to-end request paths.

## 11. Query Optimization
The process of improving database query performance by choosing efficient execution plans, using indexes, rewriting queries, and reducing unnecessary data scanning.

## 12. Deserialization
Converting data from a stored or transmitted format (e.g., JSON, binary) back into an in-memory object or data structure that the application can work with.

## 13. BFF (Backend for Frontend)
A pattern where a dedicated backend service is created for each frontend client type (web, mobile, etc.), tailoring the API to each client's specific needs rather than exposing a generic API.

## 14. MapReduce
A programming model for processing large datasets in parallel. The **map** phase transforms input into key-value pairs; the **reduce** phase aggregates results per key.

## 15. Availability
The proportion of time a system is operational and accessible. Often expressed as "nines" (e.g., 99.9% = ~8.7 hours downtime/year). Achieved through redundancy and eliminating single points of failure.

## 16. SQL vs NoSQL
**SQL** databases use structured schemas and relational tables with ACID guarantees. **NoSQL** databases (document, key-value, graph, column) offer flexible schemas and horizontal scalability, often trading consistency for performance.

## 17. REST (Representational State Transfer)
An architectural style for APIs using standard HTTP methods (GET, POST, PUT, DELETE). Resources are identified by URLs; communication is stateless.

## 18. High Availability
A design goal ensuring a system remains operational for a very high percentage of time, typically achieved through redundant components, failover clusters, and load balancing.

## 19. Consensus
A protocol by which distributed nodes agree on a single value or decision despite failures. Examples: Raft and Paxos. Essential for leader election and distributed state machines.

## 20. Indexing
A data structure technique that allows the database engine to find rows quickly without scanning the entire table. Speeds up reads at the cost of additional storage and slower writes.

## 21. Message Queue
A form of asynchronous communication where producers send messages to a queue and consumers process them independently. Decouples services and smooths out traffic spikes. Examples: RabbitMQ, SQS.

## 22. Retry Logic
Automatically re-attempting a failed operation after a delay. Commonly combined with exponential backoff and jitter to avoid thundering herds and overwhelming a recovering service.

## 23. Canary Release
A deployment strategy where a new version is rolled out to a small subset of users first. If metrics remain healthy, the rollout is gradually expanded — limiting blast radius on bad releases.

## 24. Monitoring
Continuously collecting and visualizing system metrics (CPU, memory, latency, error rates) to understand health, detect anomalies, and support capacity planning.

## 25. Connection Pooling
Reusing a set of pre-established database (or network) connections rather than opening and closing a new connection per request. Reduces latency and resource overhead significantly.

## 26. WebSockets
A protocol providing full-duplex, persistent communication channels over a single TCP connection. Ideal for real-time applications (chat, live feeds) where the server needs to push data to clients.

## 27. Strangler Pattern
A migration strategy for gradually replacing a legacy system. New functionality is built alongside the old system, which is incrementally "strangled" until it can be fully decommissioned.

## 28. Batch Processing
Processing large volumes of data in scheduled, discrete jobs rather than continuously. Efficient for non-time-sensitive workloads such as nightly reports or ETL pipelines. Examples: Hadoop, Spark.

## 29. Reliability
The probability that a system performs its intended function without failure over a given period. Differs from availability — a system can be reliable (rarely fails) yet not highly available (slow to recover).

## 30. Load Balancing
Distributing incoming network traffic across multiple servers to prevent any single server from becoming a bottleneck. Strategies include round-robin, least connections, and consistent hashing.

## 31. GraphQL
A query language and runtime for APIs that lets clients request exactly the data they need. Reduces over-fetching and under-fetching compared to REST by exposing a single, flexible endpoint.

## 32. CAP Theorem
States that a distributed system can guarantee at most **two** of: **Consistency** (every read gets the latest write), **Availability** (every request gets a response), and **Partition Tolerance** (the system works despite network partitions).

## 33. Leader Election
The process by which distributed nodes select one node to act as coordinator (leader) for a task. Ensures only one node makes certain decisions, preventing conflicts. Often implemented via Raft or ZooKeeper.

## 34. Denormalization
Intentionally introducing redundancy into a database schema (duplicating data across tables) to improve read performance at the cost of larger storage and more complex writes.

## 35. Pub/Sub (Publish-Subscribe)
A messaging pattern where publishers emit events to named topics and subscribers receive events from topics they're interested in — without direct coupling. Examples: Kafka, Google Pub/Sub.

## 36. Timeout
A maximum wait duration set on an operation. If the operation doesn't complete within the timeout, it's cancelled. Prevents cascading failures caused by slow downstream dependencies hanging indefinitely.

## 37. Feature Flags
Configuration toggles that enable or disable features at runtime without deploying new code. Used for dark launches, A/B testing, gradual rollouts, and emergency kill switches.

## 38. Alerting
Automated notifications triggered when a monitored metric crosses a defined threshold. Enables on-call engineers to respond to incidents before users are significantly affected.

## 39. Cache Stampede
A failure mode where many clients simultaneously request the same expired or missing cache entry, flooding the backend with duplicate requests. Mitigated by probabilistic expiry, locking, or request coalescing.

## 40. WebRTC (Web Real-Time Communication)
A browser-native protocol enabling peer-to-peer audio, video, and data communication directly between clients without a media server in the path. Used in video conferencing and file sharing apps.

## 41. LSM Trees (Log-Structured Merge Trees)
A data structure optimised for high write throughput. Writes go to an in-memory buffer (memtable), which is periodically flushed to disk as sorted files (SSTables), later merged in the background. Used in Cassandra, RocksDB.

## 42. Stream Processing
Processing data records continuously as they arrive, rather than in batches. Enables real-time analytics, monitoring, and event-driven reactions. Examples: Apache Kafka Streams, Flink, Spark Streaming.

## 43. Latency
The time delay between a request being sent and a response being received. Typically measured in milliseconds. High latency degrades user experience; minimising it is a core performance goal.

## 44. Caching
Storing copies of frequently accessed data in a fast-access layer (memory) to reduce latency and backend load. Caches can sit at client, CDN, application, or database levels.

## 45. gRPC (Google Remote Procedure Call)
A high-performance RPC framework using Protocol Buffers for serialization over HTTP/2. Supports bi-directional streaming and is favoured for internal microservice communication.

## 46. Consistency Models
Define the rules for when writes become visible to readers in a distributed system. Range from **strong consistency** (all reads reflect the latest write) to **eventual consistency** (replicas converge over time).

## 47. Secrets Management
Securely storing and distributing sensitive credentials (API keys, passwords, certificates) to services at runtime. Avoids hardcoding secrets in code or config files. Examples: HashiCorp Vault, AWS Secrets Manager.

## 48. ACID
Properties guaranteeing reliable database transactions: **Atomicity** (all-or-nothing), **Consistency** (valid state transitions), **Isolation** (transactions don't interfere), **Durability** (committed data persists).

## 49. Sync vs Async
**Synchronous** operations block the caller until completion. **Asynchronous** operations allow the caller to continue while the operation runs in the background, improving throughput and responsiveness.

## 50. Service Discovery
The mechanism by which services in a distributed system locate each other's network addresses dynamically, rather than using hardcoded IPs. Examples: Consul, Eureka, Kubernetes DNS.

## 51. Observability
The ability to understand the internal state of a system from its external outputs. The three pillars are **logs** (events), **metrics** (measurements), and **traces** (request flows).

## 52. Full-Text Search
Searching through unstructured text content efficiently, supporting relevance ranking, tokenisation, stemming, and fuzzy matching. Examples: Elasticsearch, Apache Solr.

## 53. Cache Warming
Pre-populating a cache before it receives live traffic to avoid a cold start where every initial request misses the cache and hits the database. Common after deployments or cache flushes.

## 54. CQRS (Command Query Responsibility Segregation)
An architectural pattern that separates the models for reading data (queries) from the models for writing data (commands), allowing each to be optimised, scaled, and even stored independently.

## 55. B-Trees
A self-balancing tree data structure used in most relational database indexes and file systems. Keeps data sorted and supports efficient search, sequential access, insertion, and deletion in O(log n).

## 56. ETL (Extract, Transform, Load)
A data pipeline pattern: **Extract** data from source systems, **Transform** it into the desired format or structure, and **Load** it into a destination (data warehouse, database). Core to data engineering.

## 57. Throughput
The amount of work a system can process in a given time period (e.g., requests per second, messages per minute). A key capacity metric alongside latency.

## 58. Cache Invalidation
The process of removing or updating stale entries in a cache when the underlying data changes. One of the hardest problems in distributed systems — getting it wrong leads to stale reads.

## 59. Authentication
Verifying the identity of a user or service ("who are you?"). Common mechanisms include passwords, tokens (JWT), OAuth, and certificates.

## 60. Replication
Copying data across multiple nodes or locations to improve availability, durability, and read performance. Can be synchronous (strong consistency) or asynchronous (eventual consistency).

## 61. RBAC (Role-Based Access Control)
An authorisation model where permissions are assigned to roles, and users are assigned roles. Simplifies permission management at scale compared to per-user access control lists.

## 62. BASE
An alternative to ACID for distributed systems: **Basically Available** (the system remains available), **Soft state** (state may change without input), **Eventual consistency** (replicas will converge). Common in NoSQL systems.

## 63. Idempotency
A property where performing the same operation multiple times produces the same result as performing it once. Critical for safe retries in distributed systems — e.g., payment or order submission APIs.

## 64. API Gateway
A single entry point that sits in front of backend services, handling cross-cutting concerns such as routing, authentication, rate limiting, SSL termination, and request/response transformation.

## 65. Logging
Recording timestamped, structured or unstructured text events from an application. Logs are used for debugging, auditing, and monitoring. Centralised log aggregation (ELK stack, Datadog) is standard in production.

## 66. Time Series
A sequence of data points indexed in time order. Time-series databases (InfluxDB, Prometheus) are optimised for storing and querying metrics, sensor readings, and financial data with high write throughput.

## 67. CDN Caching
Content Delivery Networks cache static and dynamic content at edge nodes geographically close to users, reducing latency and offloading origin servers for assets like images, scripts, and video.

## 68. Event Sourcing
Storing the state of a system as an immutable sequence of events rather than the current state. The current state is derived by replaying events. Pairs naturally with CQRS.

## 69. Merkle Trees
A hash tree where every leaf node contains a hash of data and every non-leaf node contains the hash of its children. Enables efficient and secure verification of large datasets. Used in Git, blockchains, and distributed storage.

## 70. Data Pipeline
A series of processing steps that ingest, transform, and deliver data from source to destination. Can be batch or streaming, and often involves orchestration tools like Airflow or Prefect.

## 71. Bandwidth
The maximum rate of data transfer across a network path, measured in bits per second. Determines the upper limit of how much data can be transmitted in a given time. Distinct from latency.

## 72. CDN (Content Delivery Network)
A geographically distributed network of servers that caches and delivers content from locations close to end users, reducing latency and improving load times for web assets and media.

## 73. Authorization
Determining what an authenticated entity is permitted to do ("what can you do?"). Enforced after authentication, using mechanisms like RBAC, ABAC, or policy engines such as OPA.

## 74. Partitioning
Dividing a dataset or resource into distinct, independent segments. Can be horizontal (by row/shard key) or vertical (by column). Used to improve performance, scalability, and manageability.

## 75. SSO (Single Sign-On)
An authentication scheme allowing a user to log in once and gain access to multiple applications without re-authenticating. Typically implemented with SAML, OAuth 2.0, or OIDC.

## 76. Microservices
An architectural style where an application is composed of small, independently deployable services, each responsible for a single business capability and communicating over well-defined APIs.

## 77. Backpressure
A flow-control mechanism where a downstream consumer signals to an upstream producer to slow down when it cannot keep up. Prevents overwhelming buffers and causing out-of-memory failures.

## 78. Load Shedding
Deliberately dropping or rejecting requests when a system is overloaded, to protect core functionality and prevent total failure. Preferable to accepting all requests and failing unpredictably.

## 79. Metrics
Numeric measurements collected over time representing system behaviour (e.g., request rate, error rate, CPU utilisation). Visualised in dashboards and used to trigger alerts.

## 80. Vector DB
A database optimised for storing and querying high-dimensional vector embeddings. Enables similarity search (nearest-neighbour lookup) used in AI applications, semantic search, and recommendation systems. Examples: Pinecone, Weaviate, pgvector.

## 81. Data Compression
Reducing the size of data using encoding algorithms to save storage space and reduce network transfer time. Can be lossless (exact reconstruction) or lossy (acceptable data loss, e.g., images/video).

## 82. Service Mesh
An infrastructure layer that manages service-to-service communication within a microservices architecture, providing load balancing, observability, security (mTLS), and traffic management transparently. Examples: Istio, Linkerd.

## 83. Bloom Filter
A space-efficient probabilistic data structure used to test whether an element is in a set. It can return **false positives** but never false negatives — useful for avoiding expensive lookups for data that definitely doesn't exist.

## 84. Data Lake
A centralised storage repository that holds vast amounts of raw data in its native format until needed. Unlike a data warehouse, it stores unstructured and semi-structured data and defers schema definition to query time (schema-on-read).

## 85. Client-Server
A network architecture where clients request services and servers provide them. The server is a centralised resource (e.g., a web server); clients connect to it to consume functionality.

## 86. DNS (Domain Name System)
The internet's distributed directory that translates human-readable domain names (e.g., `example.com`) into IP addresses. Acts as the first step in nearly every network request.

## 87. Rate Limiting
Controlling the rate at which a client can make requests to an API or service. Protects against abuse, DoS attacks, and resource exhaustion. Common algorithms: token bucket, leaky bucket, sliding window.

## 88. Checksum
A small value derived from a block of data using a hash function, used to detect errors or corruption. If the checksum of received data doesn't match the expected value, the data was corrupted in transit.

## 89. Encryption
The process of encoding data so that only authorised parties can read it. **At rest** encryption protects stored data; **in transit** encryption (TLS) protects data as it moves across networks.

## 90. Monolith
An application where all components (UI, business logic, data access) are deployed as a single, unified unit. Simpler to develop initially but harder to scale and deploy independently as complexity grows.

## 91. Circuit Breaker
A resilience pattern that monitors calls to a downstream service and "opens" (stops sending requests) when failures exceed a threshold, preventing cascading failures. After a cooldown, it enters a "half-open" state to test recovery.

## 92. Autoscaling
Automatically adjusting the number of compute resources (servers, containers) based on current load. Scales out under high demand and scales in during low traffic to balance performance and cost.

## 93. Tracing
Recording the journey of a single request as it travels through multiple services in a distributed system. Distributed traces (spans) are used to identify latency bottlenecks and failure points. Examples: Jaeger, Zipkin, OpenTelemetry.

## 94. Materialized View
A database object that stores the result of a query physically on disk and can be refreshed periodically. Improves read performance for expensive aggregations at the cost of staleness and storage.

## 95. Serialization
Converting an in-memory object or data structure into a format (JSON, XML, Protobuf, Avro) suitable for storage or transmission across a network.

## 96. Sidecar
A design pattern where a helper container or process is deployed alongside a primary application container, sharing its context. Used to add cross-cutting capabilities (logging, service mesh proxy, secret injection) without modifying the application.

## 97. HyperLogLog
A probabilistic algorithm for estimating the cardinality (count of distinct elements) of a very large dataset using minimal memory. Provides an approximate count with a small, configurable error rate.

## 98. Data Warehouse
A centralised repository optimised for analytical queries on large volumes of structured, historical data. Data is ingested in a transformed, schema-on-write format. Examples: Snowflake, BigQuery, Redshift.
