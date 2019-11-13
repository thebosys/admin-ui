# Form Apps

Form apps are the basic component to create or edit records.

Form apps are highly interactive, we call them forms because they are mapped to a JSON Schema file and can be autogenerated.

But the developer is in control of a form app a if it's a custom app. Maxium effort should be applied to make the experience as interactive as possible. Automatically pulling information from internal or external data sources, calculating and suggestion values dynamically. Anything that reduces the time and effort required to input or update data.

Keep in mind that with BTOS records may span several database tables and dynamically modify related data, they don't have to be tied to one DB table. Be creative with names and processes, menus so you don't end up with the same old CRM.

# How to handle simple data

Sometimes we get lucky and business requirements are simple, all we need is a database table to store a couple of fields that will be viewed, created and edited in a standard way. For this use cases all you need to do is use the standard apps with standard field components.

# How to handle one to many relationships

We you are building more complex use cases such as an ordering it's important to simplify the process as much as possible in order to spend lot's of work on the user experience of the UI.

Keep in mind that most of the time when using one to many relations in enterprise apps it's important to group and exersice analytics on the data, so each line of an order, or a billing receipt must be stored separatly on it's own table, rather than stored as a JSON field on the parent. Order would be the parent and each line of the order would be a child row on separate table.

However when the order or receipt is in draft mode we recomend they are stored in the same object. We call this and hybrid approach. While the parent record is being created in draft mode, the child records can exists among the parent record. When it's applied, then move them to their own row in a child table.

Following this approach greatly simplifies application development and you can

# How to load related data

It's important to dynamically load as much data as required without leaving the main applications screen. If a customer or any other one-to-one record needs to be selected on the form, use an autocomplete field. This field will allow users to create a new record if the one they are looking for does not exists.

If the field's names is clienteId and it's required ( ie: prices-lists are loaded depending on who the customer is ), then the form component will automatically display the autocomplete search modal when the app is loaded.

To load related data for selection lists or custom components, use the provided API hooks useQuery and useFetch. If external data needs to be loaded, for security reasons proxy the request via your API. Security and control are more important than the extra 200ms this operation will add to the http request.

## Customization y Composition

For the least amount of code required, developers can include custom fields simply by referencing them in the schema.json file and lazyly importing them on the form file.

For medium-code modification simply use the file components/Form/index

Always feel free to create custom apps, with as many dependencies as allowed by your organization. Alls apps are run and are loaded in isolation from the rest of the operating system.