package com.alarm;

import android.content.Intent;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import android.util.Log;

import java.util.ArrayList;

public class AlarmModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public AlarmModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        Helper.createNotificationChannel(reactContext);
    }

    @Override
    public String getName() {
        return "AlarmModule";
    }

    @ReactMethod
    public void getState (Promise promise) {
        Log.d("AlarmModule", "get state");
        promise.resolve(Manager.getActiveAlarm());
    }

    @ReactMethod
    public void testModule () {
        Log.d("AlarmModule", "from android");
        return ;
    }

    @ReactMethod
    public void set (ReadableMap details, Promise promise) {
        Alarm alarm = parseAlarmObject(details);
        Manager.schedule(reactContext, alarm);
        promise.resolve(null);
    }

    @ReactMethod
    public void update (ReadableMap details, Promise promise) {
        Alarm alarm = parseAlarmObject(details);
        Manager.update(reactContext, alarm);
        promise.resolve(null);
    }

    @ReactMethod
    public void updateOffAlarm (ReadableMap details, Promise promise) {
        Alarm alarm = parseAlarmObject(details);
        Manager.updateOffAlarm(reactContext, alarm);
        promise.resolve(null);
    }

    @ReactMethod
    public void remove (String alarmUid, Promise promise) {
        Manager.remove(reactContext, alarmUid);
        promise.resolve(null);
    }

    @ReactMethod
    public void removeAll (Promise promise) {
        Manager.removeAll(reactContext);
        promise.resolve(null);
    }

    @ReactMethod
    public void enable (String alarmUid, Promise promise) {
        Manager.enable(reactContext, alarmUid);
        promise.resolve(null);
    }

    @ReactMethod
    public void showRemainTimeToast(ReadableMap details, Promise promise)  {
        Alarm alarm = parseAlarmObject(details);
        Manager.showRemainTimeToast(reactContext, alarm);
        promise.resolve(null);
    }

    @ReactMethod
    public void disable (String alarmUid, Promise promise) {
        Manager.disable(reactContext, alarmUid);
        promise.resolve(null);
    }

    @ReactMethod
    public void stop (Promise promise) {
        Manager.stop(reactContext);
        Intent serviceIntent = new Intent(reactContext, AlarmService.class);
        reactContext.stopService(serviceIntent);
        promise.resolve(null);
    }

    @ReactMethod
    public void snooze (Promise promise) {
        Manager.snooze(reactContext);
        Intent serviceIntent = new Intent(reactContext, AlarmService.class);
        reactContext.stopService(serviceIntent);
        promise.resolve(null);
    }

    @ReactMethod
    public void get (String alarmUid, Promise promise) {
        try {
            Alarm alarm = Storage.getAlarm(reactContext, alarmUid);
            promise.resolve(serializeAlarmObject(alarm));
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            promise.reject(e.getMessage(), e);
        }
    }

    @ReactMethod
    public void getAll (Promise promise) {
        try {
            Alarm[] alarms = Storage.getAllAlarms(reactContext);
            WritableNativeArray serializedAlarms = serializeArray(alarms);
            promise.resolve(serializedAlarms);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            promise.reject(e.getMessage(), e);
        }
    }

    private Alarm parseAlarmObject (ReadableMap alarm) {
        String uid = alarm.getString("uid");
        String title = alarm.getString("title");
        String description = alarm.getString("description");
        int hour = alarm.getInt("hour");
        int minutes = alarm.getInt("minutes");
        int snoozeInterval = alarm.getInt("snoozeInterval");
        boolean repeating = alarm.getBoolean("repeating");
        boolean active = alarm.getBoolean("active");
        boolean isSoundOn = alarm.getBoolean("isSoundOn");
        boolean isVibrateOn = alarm.getBoolean("isVibrateOn");
        boolean isMissionAlert = alarm.getBoolean("isMissionAlert");
        ArrayList<Integer> days = new ArrayList<>();
        if (!alarm.isNull("days")) {
            ReadableArray rawDays = alarm.getArray("days");
            for (int i = 0; i < rawDays.size(); i++) {
                days.add(rawDays.getInt(i));
            }
        }
        return new Alarm(uid, days, hour, minutes, snoozeInterval, title, description, repeating, active, isSoundOn, isVibrateOn, isMissionAlert);
    }

    private WritableMap serializeAlarmObject (Alarm alarm) {
        WritableNativeMap map = new WritableNativeMap();
        map.putString("uid", alarm.uid);
        map.putString("title", alarm.title);
        map.putString("description", alarm.description);
        map.putInt("hour", alarm.hour);
        map.putInt("minutes", alarm.minutes);
        map.putInt("snoozeInterval", alarm.snoozeInterval);
        map.putArray("days", serializeArray(alarm.days));
        map.putBoolean("repeating", alarm.repeating);
        map.putBoolean("active", alarm.active);
        map.putBoolean("isSoundOn", alarm.isSoundOn);
        map.putBoolean("isVibrateOn", alarm.isVibrateOn);
        map.putBoolean("isMissionAlert", alarm.isMissionAlert);
        return map;
    }

    private WritableNativeArray serializeArray (ArrayList<Integer> a) {
        WritableNativeArray array = new WritableNativeArray();
        for (int value : a) array.pushInt(value);
        return array;
    }

    private WritableNativeArray serializeArray (Alarm[] a) {
        WritableNativeArray array = new WritableNativeArray();
        for (Alarm alarm : a) array.pushMap(serializeAlarmObject(alarm));
        return array;
    }
}
