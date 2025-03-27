# ROI Calculator

Uses playbook tags to display the automation ROI based on your specified numbers and for specific job codes (roles).

To use this widget, you need to define job codes, such as QA, IT, etc., that map the job codes to cost estimates per hour for the job codes. Next, you require to add the following tags to those playbooks that you want to include in ROI calculations:

- `#ROI`: Indicates that the playbook should be included in ROI calculations
- `#ROI_<Job Code>_<Time In Minutes>`: Indicates to the ROI Calculator widget to multiply the salary associated with the job codes by the number of minutes associated with each playbook execution.     

For example, if you want to get the automation ROI for running a manual input playbook used to evaluate indicators. You need to do the following:

1. Define job codes such as IT and QA.
2. Add the following tags to the specific manual playbook: `#ROI` `#ROI_IT_40` `#ROI_QA_50`.  
   The  `#ROI` tag specifies that this playbook must be included in ROI calculations. The `#ROI_IT_40` tag specifies that the users with the IT role would take 40 minutes to manually perform the steps defined in the playbook. Similarly, the `#ROI_QA_50` tag specifies that the users with the QA role would take 50 minutes to manually perform the steps defined in the playbook.

<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-roi-calculator/release/1.0.0/docs/media/roi-calculator-pb.png" alt="Adding tags to the playbook for ROI calculations" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">

Once you add the tags, you can add and configure the ROI Calculator widget to the Dashboards or Reports page. The ROI Calculator widget defines the salary/hour for each defined job code.

## Version Information

**Version**: 1.0.0

**Certified**: No

**Publisher**: Fortinet  

**Compatibility**: 7.2.0 and later

**Applicable**: Dashboards and Reports

## ROI Calculator Usage



## ROI Calculator Views

**ROI Calculator Edit View**:

<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-roi-calculator/release/1.0.0/docs/media/roi-calculator-edit-view.png" alt="Editing the ROI Calculator Widget" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">

**ROI Calculator Graph**:

<img src="https://raw.githubusercontent.com/fortinet-fortisoar/widget-roi-calculator/release/1.0.0/docs/media/roi-calculator-graph.png" alt="ROI Calculator on the Dashboard page" style="border: 1px solid #A9A9A9; border-radius: 4px; padding: 10px; display: block; margin-left: auto; margin-right: auto;">

## ROI Calculator Settings

Provide the following details to customize the ROI Calculator widget to suit your requirements:

| Fields                                   | Description                              |
| ---------------------------------------- | ---------------------------------------- |
| Title                                    | Specify the heading or title that you want to give to the ROI Calculator. |
| Show ROI Measured As                     | Select whether you want to display the ROI as Cost Savings ($) or Time Saving. For our example, we have chosen to display the ROI as cost savings, and therefore, included the fields and description associated with the Cost Savings ROI. |
| Currency                                 | Select the currency in which you want to display the Cost Savings ROI. |
| Job Code                                 | Specify the Job Code that you have defined and added as part of the ROI playbooks, for example, IT, QA, etc. |
| Value per hour                           | Specify the hourly cost estimate that is associated with the specified Job Code. For example, enter the cost estimate for each hour for the IT and QA job codes. |
| Only include successful playbook executions | Select this option to include only successful runs of the ROI playbooks towards ROI calculations. |
| Time Range                               | Specify the time range for which you want to consider the execution of ROI playbooks. |

