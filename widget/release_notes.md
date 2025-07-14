# What's New

- **Code Optimization**: Starting with FortiSOAR 7.6.1, this widget uses the `api/wf/api/query/workflow_logs/` API to retrieve tag-related data. For versions earlier than 7.6.1, it continues to use the `api/wf/api/workflows/log_list/` API. This change supports compatibility with multiple FortiSOAR versions, as two distinct APIs are used to fetch executed playbook data.

