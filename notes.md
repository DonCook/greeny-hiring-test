## Entities and Domain objects
I usually separate them. 
This allows to keep the code related to the queries and DB 
from the Business logic that can be part of the Domain classes.

In this exercise I kept only the entities to keep the code simpler.

### Entity IDs
My preference is to use UUID, in general.
This is less human friendly but allow for non-predictable values, 
which helps a lot protected the access to private APIs, for a low cost.

I ket the existing Entity with the original ID, 
as if this would create a breaking change in production.
