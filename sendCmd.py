#!/usr/bin/python

import time
import serial
import sys
import json

def espruino_cmd():
	with open('core.js', 'r') as myfile:
	    cmd=myfile.read() #.replace('\n', '')

	ser = serial.Serial(
		port='/dev/tty.usbserial-A9IDHR3V', # or /dev/ttyAMA0 for serial on the PI
		baudrate=115200,
		parity=serial.PARITY_NONE,
		stopbits=serial.STOPBITS_ONE,
		bytesize=serial.EIGHTBITS,
		xonxoff=0, rtscts=0, dsrdtr=0,
	)
	ser.close()
	ser.open()
	result=''
	print 'start writing...'

	for c in cmd : 
		while ser.inWaiting() > 0:
			result=result+ser.read(1)
		ser.write(c)

	endtime = time.time()+0.5 # wait 0.5 sec
	while time.time() < endtime:
		while ser.inWaiting() > 0:
			result=result+ser.read(1)
	ser.close()
	return result+'\ndone.'

print espruino_cmd().strip()
