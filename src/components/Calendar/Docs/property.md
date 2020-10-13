| Property | Description | Type | Default |
| --- | --- | --- | --- |
| rangeKey | giá trị rangeKey mặc định | `string` | `last_14_day` |
| fromDate | truyền fromDate khi rangKey là `custom` | `string` | - |
| toDate | truyền toDate khi rangKey là `custom` | `string` | - |
| compareKey | giá trị compareKey mặc định | `string` | `previous_period` |
| fromRange | truyền fromRange khi compareKey là `custom` | `string` | - |
| toRange | truyền toRange khi compareKey là `custom` | `string` | - |
| onApply | Hàm để giá trị khoảng thời gian được chọn | `func` | - |
| overlayStyle | Chỉnh sửa style của Calendar | `object` | - |
| onChange | Hàm được gọi mỗi khi rangeKey thay đổi trả về giá trị fromDate, toDate | `func` | - |

## List of rangeKey

| rangeKey | value |
| --- | --- |
| custom | Custom |
| today | Today |
| yesterday | Yesterday |
| sun_today | This week (Sun - Today) |
| mon_today | This week (Mon - Today) |
| last_7_day | Last 7 days |
| last_week_sun_sat | Last week (Sun - Sat) |
| last_week_mon_sun | Last week (Mon - Sun) |
| last_business_week | Last business week (Mon - Fri) |
| last_14_day | Last 14 days |
| this_month | This month |
| last_30_day | Last 30 days |

## List of compareKey

| compareKey | value |
| --- | --- |
| previous_period | Previous period |
| same_period_last_year | Same period last year |
| custom | Custom |