#!/bin/bash

HOSTNAME=`hostname`
IPADDR=`/sbin/ifconfig | grep 'inet '|grep -v 127.0.0.1|awk '{print $2}'|cut -d: -f2`
UPTIME=`uptime`
LOAD1=`cat /proc/loadavg|awk '{print $1}'`
LOAD5=`cat /proc/loadavg|awk '{print $2}'`
LOAD15=`cat /proc/loadavg|awk '{print $3}'`
TOP=`top -b -d1 -n2|grep -i 'Cpu(s)'|tail -1|cut -d':' -f2,3|awk '{print $1+$3}'`
FSYS=`df / -h | tail -n 1|awk '{print $5}'`
MemTotal=`cat /proc/meminfo|grep '^MemTotal'|cut -d: -f2|awk '{print $1/1024}'`
MemFree=`cat /proc/meminfo|grep '^MemFree'|cut -d: -f2|awk '{print $1/1024}'`
MemAvailable=`cat /proc/meminfo|grep '^MemAvailable'|cut -d: -f2|awk '{print $1/1024}'`
SwapTotal=`cat /proc/meminfo|grep '^SwapTotal'|cut -d: -f2|awk '{print $1/1024}'`
SwapFree=`cat /proc/meminfo|grep '^SwapFree'|cut -d: -f2|awk '{print $1/1024}'`
Cached=`cat /proc/meminfo|grep '^Cached'|cut -d: -f2|awk '{print $1/1024}'`
app_cpu=`top -b -d1 -n1|grep SFM_BT_APP|awk '{print $9}'`
app_mem=`top -b -d1 -n1|grep SFM_BT_APP|awk '{print $10}'`

echo "{
	\"hostname\":\"$HOSTNAME\", 
	\"ipaddr\":\"$IPADDR\",
	\"load1\":\"$LOAD1\",
	\"load5\":\"$LOAD5\",
	\"load15\":\"$LOAD15\",
	\"cpuusage\":\"$TOP\",
	\"memtotal\":\"$MemTotal\",
	\"memfree\":\"$MemFree\",
	\"memavailable\":\"$MemAvailable\",
	\"swaptotal\":\"$SwapTotal\",
	\"swapfree\":\"$SwapFree\",
	\"cached\":\"$Cached\",
	\"rootfsusage\":\"$FSYS\",
	\"appcpu\":\"$app_cpu\",
	\"appmem\":\"$app_mem\"
      }"
